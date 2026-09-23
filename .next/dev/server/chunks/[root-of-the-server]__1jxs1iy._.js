module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/src/app/api/analytics/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/PageView.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
;
;
;
;
function detectDevice(userAgent, width) {
    const ua = userAgent.toLowerCase();
    if (ua.includes('ipad') || ua.includes('tablet') || ua.includes('playbook') || ua.includes('silk') || width && width >= 640 && width <= 1024 && ua.includes('android')) {
        return 'Tablet';
    }
    if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('ipod') || ua.includes('android') || ua.includes('blackberry') || ua.includes('windows phone') || width && width < 640) {
        return 'Mobile';
    }
    if (ua.includes('windows') || ua.includes('macintosh') || ua.includes('linux') || ua.includes('x11')) {
        return 'Desktop';
    }
    return 'Desktop';
}
function detectBrowser(userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes('edg/')) return 'Edge';
    if (ua.includes('opr/') || ua.includes('opera/')) return 'Opera';
    if (ua.includes('chrome/')) return 'Chrome';
    if (ua.includes('firefox/')) return 'Firefox';
    if (ua.includes('safari/') && !ua.includes('chrome')) return 'Safari';
    return 'Other';
}
function detectOS(userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes('windows nt 10.0') || ua.includes('windows nt 11.0') || ua.includes('windows')) return 'Windows';
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return 'iOS';
    if (ua.includes('android')) return 'Android';
    if (ua.includes('macintosh') || ua.includes('mac os x')) return 'macOS';
    if (ua.includes('linux')) return 'Linux';
    return 'Other';
}
function inferLocationFromTimezone(timezone) {
    if (!timezone) {
        return {
            country: 'Localhost',
            city: 'Local Network',
            countryCode: 'LOC'
        };
    }
    const tz = timezone.toLowerCase();
    if (tz.includes('karachi') || tz.includes('pakistan')) {
        return {
            country: 'Pakistan',
            city: 'Karachi',
            countryCode: 'PK'
        };
    }
    if (tz.includes('lahore')) {
        return {
            country: 'Pakistan',
            city: 'Lahore',
            countryCode: 'PK'
        };
    }
    if (tz.includes('islamabad')) {
        return {
            country: 'Pakistan',
            city: 'Islamabad',
            countryCode: 'PK'
        };
    }
    if (tz.includes('new_york') || tz.includes('chicago') || tz.includes('los_angeles')) {
        return {
            country: 'United States',
            city: timezone.split('/')[1]?.replace('_', ' ') || 'USA',
            countryCode: 'US'
        };
    }
    if (tz.includes('london')) {
        return {
            country: 'United Kingdom',
            city: 'London',
            countryCode: 'GB'
        };
    }
    if (tz.includes('dubai')) {
        return {
            country: 'United Arab Emirates',
            city: 'Dubai',
            countryCode: 'AE'
        };
    }
    const parts = timezone.split('/');
    if (parts.length >= 2) {
        return {
            country: parts[0].replace('_', ' '),
            city: parts[1].replace('_', ' '),
            countryCode: parts[0].slice(0, 2).toUpperCase()
        };
    }
    return {
        country: 'Unknown',
        city: 'Unknown',
        countryCode: ''
    };
}
async function POST(req) {
    try {
        const rawHeaders = req.headers;
        const userAgent = rawHeaders.get('user-agent') || '';
        const uaLower = userAgent.toLowerCase();
        if (uaLower.includes('googlebot') || uaLower.includes('bingbot') || uaLower.includes('ahrefsbot') || uaLower.includes('semrushbot')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                skipped: true,
                reason: 'bot'
            });
        }
        const forwardedFor = rawHeaders.get('x-forwarded-for');
        const realIp = rawHeaders.get('x-real-ip');
        const cfIp = rawHeaders.get('cf-connecting-ip');
        const clientIp = (cfIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1').replace('::ffff:', '');
        let body = {};
        try {
            body = await req.json();
        } catch  {}
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
        const isLocal = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === 'localhost' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.') || clientIp.startsWith('172.16.');
        if (!country && isLocal) {
            const inferred = inferLocationFromTimezone(timezone);
            country = inferred.country;
            city = inferred.city;
            countryCode = inferred.countryCode;
        } else if (!country && !isLocal && clientIp) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(()=>controller.abort(), 1200);
                const geoRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,country,countryCode,city`, {
                    signal: controller.signal
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
            } catch  {
                const inferred = inferLocationFromTimezone(timezone);
                country = inferred.country;
                city = inferred.city;
                countryCode = inferred.countryCode;
            }
        }
        if (!country) country = 'Unknown';
        if (!city) city = 'Unknown';
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectMongoDB"])();
        let existingVisitor = null;
        if (clientIp) {
            existingVisitor = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                ip: clientIp
            });
        }
        if (!existingVisitor && deviceId) {
            existingVisitor = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                deviceId
            });
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                isNewVisitor: false,
                updated: true
            }, {
                status: 200
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
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
            lastVisitedAt: new Date()
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            isNewVisitor: true
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Analytics record error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to record analytics'
        }, {
            status: 500
        });
    }
}
async function GET(req) {
    try {
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyAuthToken"])(req);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized: Access token required'
            }, {
                status: 401
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectMongoDB"])();
        const totalViews = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const viewsToday = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments({
            $or: [
                {
                    lastVisitedAt: {
                        $gte: startOfToday
                    }
                },
                {
                    createdAt: {
                        $gte: startOfToday
                    }
                }
            ]
        });
        const uniqueIps = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].distinct('ip');
        const uniqueVisitors = uniqueIps.length || totalViews;
        const rawDevices = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
            {
                $group: {
                    _id: '$device',
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]);
        const devices = rawDevices.map((d)=>({
                name: d._id || 'Desktop',
                count: d.count,
                percentage: totalViews > 0 ? Math.round(d.count / totalViews * 100) : 0
            }));
        const rawLocations = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
            {
                $group: {
                    _id: {
                        country: '$country',
                        city: '$city',
                        countryCode: '$countryCode'
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 10
            }
        ]);
        const locations = rawLocations.map((loc)=>({
                country: loc._id.country || 'Unknown',
                city: loc._id.city || 'Unknown',
                countryCode: loc._id.countryCode || '',
                count: loc.count,
                percentage: totalViews > 0 ? Math.round(loc.count / totalViews * 100) : 0
            }));
        const rawBrowsers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
            {
                $group: {
                    _id: '$browser',
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 6
            }
        ]);
        const browsers = rawBrowsers.map((b)=>({
                name: b._id || 'Other',
                count: b.count,
                percentage: totalViews > 0 ? Math.round(b.count / totalViews * 100) : 0
            }));
        const rawOS = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
            {
                $group: {
                    _id: '$os',
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 6
            }
        ]);
        const os = rawOS.map((o)=>({
                name: o._id || 'Other',
                count: o.count,
                percentage: totalViews > 0 ? Math.round(o.count / totalViews * 100) : 0
            }));
        const recentVisits = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find().sort({
            lastVisitedAt: -1,
            createdAt: -1
        }).limit(25).lean();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            totalViews,
            uniqueVisitors,
            viewsToday,
            devices,
            locations,
            browsers,
            os,
            recentVisits
        });
    } catch (error) {
        console.error('Analytics GET error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch analytics'
        }, {
            status: 500
        });
    }
}
async function DELETE(req) {
    try {
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyAuthToken"])(req);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized: Access token required'
            }, {
                status: 401
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectMongoDB"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PageView$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].deleteMany({});
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'All analytics data cleared successfully'
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to clear analytics'
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateToken",
    ()=>generateToken,
    "sanitizeInput",
    ()=>sanitizeInput,
    "verifyAuthToken",
    ()=>verifyAuthToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jsonwebtoken$29$__ = __turbopack_context__.i("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs, [project]/node_modules/jsonwebtoken)");
;
const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_jwt_secret_9988_secure_key!';
function verifyAuthToken(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return null;
    }
    try {
        const decoded = __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jsonwebtoken$29$__["default"].verify(token, JWT_SECRET);
        return decoded;
    } catch  {
        return null;
    }
}
function generateToken(username) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jsonwebtoken$29$__["default"].sign({
        username
    }, JWT_SECRET, {
        expiresIn: '1d'
    });
}
function sanitizeInput(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(sanitizeInput);
    }
    const sanitized = {};
    for (const key of Object.keys(obj)){
        if (!key.startsWith('$') && !key.includes('.')) {
            sanitized[key] = sanitizeInput(obj[key]);
        }
    }
    return sanitized;
}
}),
"[project]/src/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectMongoDB",
    ()=>connectMongoDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URL;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectMongoDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
;
}),
"[project]/src/models/PageView.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const PageViewSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    deviceId: {
        type: String,
        default: '',
        trim: true
    },
    device: {
        type: String,
        enum: [
            'Mobile',
            'Desktop',
            'Tablet',
            'Other'
        ],
        default: 'Desktop'
    },
    browser: {
        type: String,
        default: 'Other'
    },
    os: {
        type: String,
        default: 'Other'
    },
    country: {
        type: String,
        default: 'Unknown'
    },
    countryCode: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: 'Unknown'
    },
    ip: {
        type: String,
        default: ''
    },
    path: {
        type: String,
        default: '/'
    },
    referrer: {
        type: String,
        default: ''
    },
    screenResolution: {
        type: String,
        default: ''
    },
    userAgent: {
        type: String,
        default: ''
    },
    sessionId: {
        type: String,
        default: ''
    },
    visitCount: {
        type: Number,
        default: 1
    },
    lastVisitedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
PageViewSchema.index({
    deviceId: 1
});
PageViewSchema.index({
    createdAt: -1
});
PageViewSchema.index({
    lastVisitedAt: -1
});
PageViewSchema.index({
    device: 1
});
PageViewSchema.index({
    country: 1
});
PageViewSchema.index({
    ip: 1
});
const PageView = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.PageView || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('PageView', PageViewSchema);
const __TURBOPACK__default__export__ = PageView;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1jxs1iy._.js.map