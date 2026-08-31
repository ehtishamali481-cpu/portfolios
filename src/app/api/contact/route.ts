import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Message } from '@/models/Message';
import { sanitizeInput } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { name, email, subject, message } = body;

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = typeof subject === 'string' ? subject.trim() : 'No Subject';
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    await connectMongoDB();
    const newMessage = await Message.create({
      name: trimmedName.slice(0, 120),
      email: trimmedEmail.slice(0, 200),
      subject: (trimmedSubject || 'No Subject').slice(0, 300),
      message: trimmedMessage.slice(0, 5000),
      read: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
