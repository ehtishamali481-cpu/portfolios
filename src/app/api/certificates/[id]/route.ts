import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
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
      return NextResponse.json({ error: 'Invalid certificate ID' }, { status: 400 });
    }

    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { title, image } = body;

    await connectMongoDB();
    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    if (title !== undefined) certificate.title = String(title).trim();
    if (image !== undefined) certificate.image = String(image).trim();

    await certificate.save();
    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error updating certificate:', error);
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid certificate ID' }, { status: 400 });
    }

    await connectMongoDB();
    const deleted = await Certificate.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Certificate deleted' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
