import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';


export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {

    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
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
    const { title, description, tech, link, github, testCasesLink, category, image } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const techArray = Array.isArray(tech)
      ? tech.map((t: any) => String(t).trim()).filter(Boolean)
      : typeof tech === 'string'
        ? tech.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

    await connectMongoDB();
    const newProject = await Project.create({
      title: String(title).trim(),
      description: String(description).trim(),
      category: category ? String(category).trim() : 'Full Stack',
      image: image ? String(image).trim() : '',
      tech: techArray,
      link: link ? String(link).trim() : '',
      github: github ? String(github).trim() : '',
      testCasesLink: testCasesLink ? String(testCasesLink).trim() : '',
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
