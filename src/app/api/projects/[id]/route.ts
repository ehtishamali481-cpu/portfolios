import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { verifyAuthToken, sanitizeInput } from '@/lib/auth';

// PUT /api/projects/[id] - Protected
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
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const rawBody = await req.json();
    const body = sanitizeInput(rawBody);
    const { title, description, tech, link, github, testCasesLink, category, image } = body;

    await connectMongoDB();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (title !== undefined) project.title = String(title).trim();
    if (description !== undefined) project.description = String(description).trim();
    if (category !== undefined) project.category = String(category).trim();
    if (image !== undefined) project.image = String(image).trim();
    if (link !== undefined) project.link = String(link).trim();
    if (github !== undefined) project.github = String(github).trim();
    if (testCasesLink !== undefined) project.testCasesLink = String(testCasesLink).trim();
    if (tech !== undefined) {
      project.tech = Array.isArray(tech)
        ? tech.map((t: any) => String(t).trim()).filter(Boolean)
        : typeof tech === 'string'
        ? tech.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
    }

    await project.save();
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects/[id] - Protected
export async function DELETE(
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
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    await connectMongoDB();
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
