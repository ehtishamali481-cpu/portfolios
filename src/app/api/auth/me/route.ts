import { NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(req: Request) {
  const user = verifyAuthToken(req as any);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ success: true, username: user.username });
}
