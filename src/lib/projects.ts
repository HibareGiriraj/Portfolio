import fs from 'fs';
import path from 'path';

export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription?: string;
    stack: string[];
    features: string[];
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
    published: boolean;
}

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'projects.json');

// Read all projects from JSON file
export function getAllProjects(): Project[] {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading projects file:', error);
        return [];
    }
}

// Get only published projects
export function getPublishedProjects(): Project[] {
    return getAllProjects().filter(p => p.published);
}

// Get project by ID
export function getProjectById(id: string): Project | undefined {
    return getAllProjects().find(p => p.id === id);
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
    return getAllProjects().find(p => p.slug === slug && p.published);
}

// Get all slugs for static generation
export function getAllSlugs(): string[] {
    return getPublishedProjects().map(p => p.slug);
}

// Add a new project
export function addProject(project: Omit<Project, 'id'>): Project {
    const projects = getAllProjects();
    const newId = (Math.max(...projects.map(p => parseInt(p.id)), 0) + 1).toString();
    const newProject: Project = { ...project, id: newId };
    projects.push(newProject);
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 4));
    return newProject;
}

// Update a project
export function updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = getAllProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    projects[index] = { ...projects[index], ...updates };
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 4));
    return projects[index];
}

// Delete a project
export function deleteProject(id: string): boolean {
    const projects = getAllProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    projects.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 4));
    return true;
}
