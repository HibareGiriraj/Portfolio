import { getPublishedProjects } from '@/lib/projects';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
    const projects = getPublishedProjects();

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Renamed to show ownership */}
                <h2 className="section-title">Production Case Study</h2>
                <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                    Real work I've shipped and maintained in production environments.
                </p>

                <div className="space-y-8">
                    {projects.map((project) => (
                        <article
                            key={project.slug}
                            className="glass-card overflow-hidden"
                        >
                            <div className="grid md:grid-cols-3 gap-0">
                                {/* Image */}
                                <div className="relative overflow-hidden h-64 md:h-auto img-zoom">
                                    <img
                                        src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop"}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content - Case Study Format */}
                                <div className="md:col-span-2 p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="tag mb-2 inline-block">Production Work</span>
                                            <h3 className="text-2xl font-bold text-white">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="flex gap-3">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="social-icon"
                                                >
                                                    <FaGithub size={18} />
                                                </a>
                                            )}
                                            {project.liveUrl && project.liveUrl !== '#' && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="social-icon"
                                                >
                                                    <FaExternalLinkAlt size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Problem/Solution Format */}
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-1">The Problem</h4>
                                            <p className="text-slate-400 text-sm">
                                                {project.description}
                                            </p>
                                        </div>
                                        {project.longDescription && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-1">My Approach</h4>
                                                <p className="text-slate-400 text-sm">
                                                    {project.longDescription}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(project.stack || []).slice(0, 6).map((tech) => (
                                            <span key={tech} className="tag tag-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Features as Impact */}
                                    {project.features && project.features.length > 0 && (
                                        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                                            {project.features.map((feature, i) => (
                                                <span key={i} className="flex items-center gap-1">
                                                    <span className="text-cyan-400">✓</span> {feature}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
