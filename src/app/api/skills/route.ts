import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Skill } from '@/models/Skill';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

export async function GET() {
  try {
    await connectMongoDB();
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
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
    const { name, category, level } = body;

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
    }

    const validCategories = ['frontend', 'backend', 'database', 'other'];
    const cleanCategory = validCategories.includes(category) ? category : 'other';

    await connectMongoDB();
    const newSkill = await Skill.create({
      name: String(name).trim(),
      category: cleanCategory,
      level: level !== undefined ? Math.min(100, Math.max(0, Number(level) || 80)) : 80,
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
