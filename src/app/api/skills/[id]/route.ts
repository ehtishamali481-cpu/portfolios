import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '@/lib/mongodb';
import { Skill } from '@/models/Skill';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Access token required' }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid skill ID' }, { status: 400 });
    }

    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { name, category, level } = body;

    await connectMongoDB();
    const skill = await Skill.findById(id);

    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    if (name !== undefined) skill.name = String(name).trim();
    if (category !== undefined) {
      const validCategories = ['frontend', 'backend', 'database', 'other'];
      if (validCategories.includes(category)) skill.category = category;
    }
    if (level !== undefined) {
      skill.level = Math.min(100, Math.max(0, Number(level) || 80));
    }

    await skill.save();
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Access token required' }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid skill ID' }, { status: 400 });
    }

    await connectMongoDB();
    const deleted = await Skill.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
