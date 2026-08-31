import { NextResponse } from 'next/server';
import { verifyAuthToken, generateToken } from '@/lib/auth';

export async function POST(req: Request) {
  const user = verifyAuthToken(req as any);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newToken = generateToken(user.username);
  return NextResponse.json({
    success: true,
    token: newToken,
    username: user.username,
    expiresIn: '1d',
    message: 'Token regenerated successfully',
  });
}
