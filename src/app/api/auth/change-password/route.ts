import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { currentPassword, newPassword } = body;

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return NextResponse.json({ error: 'Passwords must be valid strings' }, { status: 400 });
    }

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const admin = await Admin.findOne({ username: user.username });
    if (!admin) {
      return NextResponse.json({ error: 'Admin account not found' }, { status: 404 });
    }

    const isPasswordValid = bcrypt.compareSync(currentPassword, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    admin.passwordHash = bcrypt.hashSync(newPassword, salt);
    await admin.save();

    return NextResponse.json({ success: true, message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
