import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Skill } from '@/models/Skill';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

const SEED_SKILLS: Array<{
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'other' | 'testing';
  level: number;
}> = [
  { name: 'HTML5', category: 'frontend', level: 90 },
  { name: 'CSS3 / Tailwind CSS', category: 'frontend', level: 90 },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 88 },
  { name: 'TypeScript', category: 'frontend', level: 85 },
  { name: 'React.js', category: 'frontend', level: 92 },
  { name: 'Next.js', category: 'frontend', level: 88 },
  { name: 'Node.js / Express.js', category: 'backend', level: 88 },
  { name: 'Python', category: 'backend', level: 82 },
  { name: 'FastAPI', category: 'backend', level: 85 },
  { name: 'REST APIs & GraphQL', category: 'backend', level: 90 },
  { name: 'MongoDB / Mongoose', category: 'database', level: 88 },
  { name: 'SQL / PostgreSQL', category: 'database', level: 85 },
  { name: 'Playwright', category: 'testing', level: 82 },
  { name: 'Selenium', category: 'testing', level: 80 },
  { name: 'Git & GitHub', category: 'other', level: 85 },
];

export async function GET() {
  try {
    await connectMongoDB();
    let skills = await Skill.find().sort({ category: 1, level: -1 });
    if (!skills || skills.length === 0) {
      await Skill.insertMany(SEED_SKILLS as any);
      skills = await Skill.find().sort({ category: 1, level: -1 });
    }
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = verifyAuthToken(req as any);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Access token required' }, { status: 401 });
    }

    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { name, category, level } = body;

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
    }

    const validCategories: Array<'frontend' | 'backend' | 'database' | 'other' | 'testing'> = [
      'frontend',
      'backend',
      'database',
      'other',
      'testing',
    ];
    const cleanCategory: 'frontend' | 'backend' | 'database' | 'other' | 'testing' = validCategories.includes(category as any)
      ? (category as 'frontend' | 'backend' | 'database' | 'other' | 'testing')
      : 'other';

    await connectMongoDB();
    const newSkill = await Skill.create({
      name: String(name).trim(),
      category: cleanCategory,
      level: level !== undefined ? Math.min(100, Math.max(0, Number(level) || 80)) : 80,
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
