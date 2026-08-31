import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_jwt_secret_9988_secure_key!';

export interface DecodedUser {
  username: string;
}

export function verifyAuthToken(req: NextRequest): DecodedUser | null {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;
    return decoded;
  } catch {
    return null;
  }
}

export function generateToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
}

export function sanitizeInput(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeInput);
  }

  const sanitized: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    if (!key.startsWith('$') && !key.includes('.')) {
      sanitized[key] = sanitizeInput(obj[key]);
    }
  }
  return sanitized;
}
