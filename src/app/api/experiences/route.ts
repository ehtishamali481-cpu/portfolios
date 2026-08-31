import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Experience } from '@/models/Experience';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

export async function GET() {
  try {
    await connectMongoDB();
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
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
    const { role, company, duration, description } = body;

    if (!role || !company || !duration || !description) {
      return NextResponse.json(
        { error: 'All fields (role, company, duration, description) are required' },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const newExp = await Experience.create({
      role: String(role).trim(),
      company: String(company).trim(),
      duration: String(duration).trim(),
      description: String(description).trim(),
    });

    return NextResponse.json(newExp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
