import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '@/lib/mongodb';
import { Message } from '@/models/Message';
import { verifyAuthToken } from '@/lib/auth';

// PUT /api/messages/[id]/read - Toggle or mark message as read (Protected)
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
      return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 });
    }

    await connectMongoDB();
    const msg = await Message.findById(id);
    if (!msg) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    msg.read = !msg.read;
    await msg.save();

    return NextResponse.json({ success: true, message: 'Message read status updated', read: msg.read });
  } catch (error) {
    console.error('Error updating message read status:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}
