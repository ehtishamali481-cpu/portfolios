import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import PageView from '@/models/PageView';
import { verifyAuthToken } from '@/lib/auth';

function detectDevice(userAgent: string, width?: number): 'Mobile' | 'Tablet' | 'Desktop' | 'Other' {
  const ua = userAgent.toLowerCase();

  if (
    ua.includes('ipad') ||
    ua.includes('tablet') ||
    ua.includes('playbook') ||
    ua.includes('silk') ||
    (width && width >= 640 && width <= 1024 && ua.includes('android'))
  ) {
    return 'Tablet';
  }

  if (
    ua.includes('mobile') ||
    ua.includes('iphone') ||
    ua.includes('ipod') ||
    ua.includes('android') ||
    ua.includes('blackberry') ||
    ua.includes('windows phone') ||
    (width && width < 640)
  ) {
    return 'Mobile';
  }

  if (ua.includes('windows') || ua.includes('macintosh') || ua.includes('linux') || ua.includes('x11')) {
    return 'Desktop';
  }

  return 'Desktop';
}
function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('edg/')) return 'Edge';
  if (ua.includes('opr/') || ua.includes('opera/')) return 'Opera';
  if (ua.includes('chrome/')) return 'Chrome';
  if (ua.includes('firefox/')) return 'Firefox';
  if (ua.includes('safari/') && !ua.includes('chrome')) return 'Safari';
  return 'Other';
}

function detectOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows nt 10.0') || ua.includes('windows nt 11.0') || ua.includes('windows')) return 'Windows';
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return 'iOS';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('macintosh') || ua.includes('mac os x')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  return 'Other';
}

function inferLocationFromTimezone(timezone?: string): { country: string; city: string; countryCode: string } {
  if (!timezone) {
    return { country: 'Localhost', city: 'Local Network', countryCode: 'LOC' };
  }
  const tz = timezone.toLowerCase();
  if (tz.includes('karachi') || tz.includes('pakistan')) {
    return { country: 'Pakistan', city: 'Karachi', countryCode: 'PK' };
  }
  if (tz.includes('lahore')) {
    return { country: 'Pakistan', city: 'Lahore', countryCode: 'PK' };
  }
  if (tz.includes('islamabad')) {
    return { country: 'Pakistan', city: 'Islamabad', countryCode: 'PK' };
  }
  if (tz.includes('new_york') || tz.includes('chicago') || tz.includes('los_angeles')) {
    return { country: 'United States', city: timezone.split('/')[1]?.replace('_', ' ') || 'USA', countryCode: 'US' };
  }
  if (tz.includes('london')) {
    return { country: 'United Kingdom', city: 'London', countryCode: 'GB' };
  }
  if (tz.includes('dubai')) {
    return { country: 'United Arab Emirates', city: 'Dubai', countryCode: 'AE' };
  }

  const parts = timezone.split('/');
  if (parts.length >= 2) {
    return {
      country: parts[0].replace('_', ' '),
      city: parts[1].replace('_', ' '),
      countryCode: parts[0].slice(0, 2).toUpperCase(),
    };
  }

  return { country: 'Unknown', city: 'Unknown', countryCode: '' };
}
export async function POST(req: Request) {
  try {
    const rawHeaders = req.headers;
    const userAgent = rawHeaders.get('user-agent') || '';

    const uaLower = userAgent.toLowerCase();
    if (
      uaLower.includes('googlebot') ||
      uaLower.includes('bingbot') ||
      uaLower.includes('ahrefsbot') ||
      uaLower.includes('semrushbot')
    ) {
      return NextResponse.json({ skipped: true, reason: 'bot' });
    }
    const forwardedFor = rawHeaders.get('x-forwarded-for');
    const realIp = rawHeaders.get('x-real-ip');
    const cfIp = rawHeaders.get('cf-connecting-ip');
    const clientIp = (cfIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1').replace('::ffff:', '');

    let body: any = {};
    try {
      body = await req.json();
    } catch {
    }

    const deviceId = typeof body.deviceId === 'string' && body.deviceId.trim() ? body.deviceId.trim() : '';
    const screenWidth = typeof body.screenWidth === 'number' ? body.screenWidth : undefined;
    const screenHeight = typeof body.screenHeight === 'number' ? body.screenHeight : undefined;
    const path = typeof body.path === 'string' ? body.path : '/';
    const referrer = typeof body.referrer === 'string' ? body.referrer : '';
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
    const timezone = typeof body.timezone === 'string' ? body.timezone : undefined;

    const device = detectDevice(userAgent, screenWidth);
    const browser = detectBrowser(userAgent);
    const os = detectOS(userAgent);

    let country = rawHeaders.get('x-vercel-ip-country-name') || rawHeaders.get('x-vercel-ip-country') || '';
    let countryCode = rawHeaders.get('x-vercel-ip-country') || rawHeaders.get('cf-ipcountry') || '';
    let city = rawHeaders.get('x-vercel-ip-city') || '';

    const isLocal =
      clientIp === '127.0.0.1' ||
      clientIp === '::1' ||
      clientIp === 'localhost' ||
      clientIp.startsWith('192.168.') ||
      clientIp.startsWith('10.') ||
      clientIp.startsWith('172.16.');

    if (!country && isLocal) {
      const inferred = inferLocationFromTimezone(timezone);
      country = inferred.country;
      city = inferred.city;
      countryCode = inferred.countryCode;
    } else if (!country && !isLocal && clientIp) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const geoRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,country,countryCode,city`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === 'success') {
            country = geoData.country || country;
            countryCode = geoData.countryCode || countryCode;
            city = geoData.city || city;
          }
        }
      } catch {
        const inferred = inferLocationFromTimezone(timezone);
        country = inferred.country;
        city = inferred.city;
        countryCode = inferred.countryCode;
      }
    }

    if (!country) country = 'Unknown';
    if (!city) city = 'Unknown';

    await connectMongoDB();
    let existingVisitor = null;
    if (clientIp) {
      existingVisitor = await PageView.findOne({ ip: clientIp });
    }
    if (!existingVisitor && deviceId) {
      existingVisitor = await PageView.findOne({ deviceId });
    }

    if (existingVisitor) {
      existingVisitor.visitCount = (existingVisitor.visitCount || 1) + 1;
      existingVisitor.lastVisitedAt = new Date();
      existingVisitor.path = path;
      existingVisitor.device = device;
      existingVisitor.browser = browser;
      existingVisitor.os = os;
      if (screenWidth && screenHeight) {
        existingVisitor.screenResolution = `${screenWidth}x${screenHeight}`;
      }
      await existingVisitor.save();
      return NextResponse.json({ success: true, isNewVisitor: false, updated: true }, { status: 200 });
    }
    await PageView.create({
      ip: clientIp,
      deviceId,
      device,
      browser,
      os,
      country,
      countryCode,
      city,
      path,
      referrer,
      screenResolution: screenWidth && screenHeight ? `${screenWidth}x${screenHeight}` : '',
      userAgent,
      sessionId,
      visitCount: 1,
      lastVisitedAt: new Date(),
    });

    return NextResponse.json({ success: true, isNewVisitor: true }, { status: 201 });
  } catch (error) {
    console.error('Analytics record error:', error);
    return NextResponse.json({ error: 'Failed to record analytics' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Access token required' }, { status: 401 });
    }

    await connectMongoDB();

    const totalViews = await PageView.countDocuments();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const viewsToday = await PageView.countDocuments({
      $or: [{ lastVisitedAt: { $gte: startOfToday } }, { createdAt: { $gte: startOfToday } }],
    });

    const uniqueIps = await PageView.distinct('ip');
    const uniqueVisitors = uniqueIps.length || totalViews;

    const rawDevices = await PageView.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const devices = rawDevices.map((d) => ({
      name: d._id || 'Desktop',
      count: d.count,
      percentage: totalViews > 0 ? Math.round((d.count / totalViews) * 100) : 0,
    }));

    const rawLocations = await PageView.aggregate([
      {
        $group: {
          _id: { country: '$country', city: '$city', countryCode: '$countryCode' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const locations = rawLocations.map((loc) => ({
      country: loc._id.country || 'Unknown',
      city: loc._id.city || 'Unknown',
      countryCode: loc._id.countryCode || '',
      count: loc.count,
      percentage: totalViews > 0 ? Math.round((loc.count / totalViews) * 100) : 0,
    }));

    const rawBrowsers = await PageView.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const browsers = rawBrowsers.map((b) => ({
      name: b._id || 'Other',
      count: b.count,
      percentage: totalViews > 0 ? Math.round((b.count / totalViews) * 100) : 0,
    }));

    const rawOS = await PageView.aggregate([
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const os = rawOS.map((o) => ({
      name: o._id || 'Other',
      count: o.count,
      percentage: totalViews > 0 ? Math.round((o.count / totalViews) * 100) : 0,
    }));
    const recentVisits = await PageView.find()
      .sort({ lastVisitedAt: -1, createdAt: -1 })
      .limit(25)
      .lean();

    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      viewsToday,
      devices,
      locations,
      browsers,
      os,
      recentVisits,
    });
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Access token required' }, { status: 401 });
    }

    await connectMongoDB();
    await PageView.deleteMany({});

    return NextResponse.json({ message: 'All analytics data cleared successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear analytics' }, { status: 500 });
  }
}
