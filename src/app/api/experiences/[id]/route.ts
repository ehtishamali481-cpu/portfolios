import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '@/lib/mongodb';
import { Experience } from '@/models/Experience';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

// PUT /api/experiences/[id] - Protected
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
      return NextResponse.json({ error: 'Invalid experience ID' }, { status: 400 });
    }

    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { role, company, duration, description } = body;

    await connectMongoDB();
    const exp = await Experience.findById(id);

    if (!exp) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    if (role !== undefined) exp.role = String(role).trim();
    if (company !== undefined) exp.company = String(company).trim();
    if (duration !== undefined) exp.duration = String(duration).trim();
    if (description !== undefined) exp.description = String(description).trim();

    await exp.save();
    return NextResponse.json(exp);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

// DELETE /api/experiences/[id] - Protected
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
      return NextResponse.json({ error: 'Invalid experience ID' }, { status: 400 });
    }

    await connectMongoDB();
    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
