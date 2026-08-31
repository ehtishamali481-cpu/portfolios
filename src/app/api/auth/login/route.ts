import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import { generateToken, sanitizeInput } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { username, password } = body;

    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Username and password must be strings' }, { status: 400 });
    }

    const trimmedUsername = username.trim().toLowerCase();
    if (!trimmedUsername || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    await connectMongoDB();
    const admin = await Admin.findOne({ username: trimmedUsername });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = generateToken(admin.username);

    return NextResponse.json({
      success: true,
      token,
      username: admin.username,
      expiresIn: '1d',
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login process failed' }, { status: 500 });
  }
}
