import { Metadata } from 'next';
import { getPublishedProjects } from '@/lib/projects';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

export const metadata: Metadata = {
    title: 'Projects | Giriraj Hibare',
    description: 'Full-stack web applications built with React, Node.js, MongoDB, and more. Each project demonstrates authentication, API design, and database architecture.',
};

export default function ProjectsPage() {
    const projects = getPublishedProjects();

    return (
        <main className="min-h-screen bg-black pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Projects
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Full-stack applications demonstrating real-world development skills
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-8">
                    {projects.map((project) => (
                        <article
                            key={project.slug}
                            className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-colors"
                        >
                            <div className="md:flex">
                                {/* Image */}
                                <div className="md:w-1/3 h-48 md:h-auto">
                                    <img
                                        src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600"}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="md:w-2/3 p-6">
                                    <h2 className="text-xl font-semibold text-white mb-2">
                                        {project.title}
                                    </h2>
                                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="text-sm text-white hover:text-slate-300 transition-colors flex items-center gap-2"
                                        >
                                            View Details <FaArrowRight size={12} />
                                        </Link>
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-white transition-colors"
                                            >
                                                <FaGithub size={18} />
                                            </a>
                                        )}
                                        {project.liveUrl && project.liveUrl !== '#' && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-white transition-colors"
                                            >
                                                <FaExternalLinkAlt size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Back Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
