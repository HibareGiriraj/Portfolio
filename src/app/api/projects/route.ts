import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getPublishedProjects, addProject } from '@/lib/projects';

// GET all published projects
export async function GET() {
    try {
        const projects = getPublishedProjects();
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json([], { status: 500 });
    }
}

// POST new project (admin only)
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // Create slug from title
        const slug = body.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const newProject = addProject({
            title: body.title,
            slug: slug,
            description: body.description,
            longDescription: body.description,
            stack: body.techStack || [],
            features: [],
            image: body.image || '',
            githubUrl: body.githubLink || '',
            liveUrl: body.liveLink || '',
            published: true
        });

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
