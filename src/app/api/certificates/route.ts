import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

export async function GET() {
  try {
    await connectMongoDB();
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Access token required' }, { status: 401 });
    }

    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { title, image } = body;

    if (!title || !image) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    await connectMongoDB();
    const newCertificate = await Certificate.create({
      title: String(title).trim(),
      image: String(image).trim(),
    });

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
