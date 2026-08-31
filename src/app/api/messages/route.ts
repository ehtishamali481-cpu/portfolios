import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Message } from '@/models/Message';
import { verifyAuthToken } from '@/lib/auth';


export async function GET(req: Request) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Access token required' }, { status: 401 });
    }

    await connectMongoDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
