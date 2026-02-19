import { getPublishedProjects } from '@/lib/projects';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
    const projects = getPublishedProjects();

    return (
        <section id="projects" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-16">
                    <h2 className="section-title mb-4">Work I've Shipped</h2>
                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                        Production systems I've built and deployed for real companies
                    </p>
                </div>

                <div className="space-y-10">
                    {projects.map((project) => (
                        <article
                            key={project.slug}
                            id={`project-${project.slug}`}
                            className="glass-card overflow-hidden"
                        >
                            {/* Top Badge Bar */}
                            <div className="flex flex-wrap items-center gap-3 px-4 sm:px-6 md:px-8 pt-5 pb-3">
                                {project.isLiveProduct && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                                        Live Product
                                    </span>
                                )}
                                {project.company && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                                        Built at {project.company}
                                    </span>
                                )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-0">
                                {/* Image */}
                                <div className="relative overflow-hidden h-48 sm:h-64 md:h-auto img-zoom">
                                    <img
                                        src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop"}
                                        alt={`${project.title} - ${project.description || 'Project screenshot'}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        width={800}
                                        height={500}
                                    />
                                </div>

                                {/* Content */}
                                <div className="md:col-span-2 p-4 sm:p-6 md:p-8">
                                    <div className="mb-4">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Impact Metrics — Large & Prominent */}
                                    {project.impact && project.impact.length > 0 && (
                                        <div className="mb-6">
                                            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">Impact Metrics</h4>
                                            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                                                {project.impact.map((metric, idx) => {
                                                    // Extract the number/stat and label
                                                    const match = metric.match(/^([\d+%]+\+?|Zero)\s*(.*)/i);
                                                    if (match) {
                                                        return (
                                                            <div key={idx} className="text-center p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-1">{match[1]}</div>
                                                                <div className="text-xs text-slate-400 leading-tight">{match[2]}</div>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <div key={idx} className="text-center p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                                            <div className="text-xs sm:text-sm text-slate-300">{metric}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <div className="mb-6">
                                        <ul className="space-y-2">
                                            <li className="text-slate-300 text-sm flex items-start gap-2">
                                                <span className="text-cyan-400 mt-1 shrink-0" aria-hidden="true">▸</span>
                                                <span>{project.description}</span>
                                            </li>
                                            {project.longDescription && (
                                                <li className="text-slate-300 text-sm flex items-start gap-2">
                                                    <span className="text-cyan-400 mt-1 shrink-0" aria-hidden="true">▸</span>
                                                    <span>{project.longDescription}</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(project.stack || []).slice(0, 6).map((tech) => (
                                            <span key={tech} className="tag tag-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    {project.features && project.features.length > 0 && (
                                        <div className="border-t border-slate-700 pt-4 mb-4">
                                            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">Key Features</h4>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                                {project.features.map((feature, i) => (
                                                    <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                                                        <span className="text-cyan-400 mt-1 shrink-0" aria-hidden="true">▸</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* CTAs */}
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
                                        {project.liveUrl && project.liveUrl !== '#' && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary text-sm min-h-[44px] px-4"
                                                aria-label={`Visit ${project.title} live site`}
                                            >
                                                <FaExternalLinkAlt aria-hidden="true" />
                                                <span className="hidden sm:inline">Visit Live Site</span>
                                                <span className="sm:hidden">Live Site</span>
                                            </a>
                                        )}
                                        {project.githubUrl && project.githubUrl !== '#' && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary text-sm min-h-[44px] px-4"
                                                aria-label={`View ${project.title} source code`}
                                            >
                                                <FaGithub aria-hidden="true" />
                                                <span className="hidden sm:inline">View Code</span>
                                                <span className="sm:hidden">Code</span>
                                            </a>
                                        )}
                                        {project.slug && (
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="btn-secondary text-sm min-h-[44px] px-4"
                                                aria-label={`Read case study for ${project.title}`}
                                            >
                                                <span className="hidden sm:inline">Case Study</span>
                                                <span className="sm:hidden">Details</span>
                                                <span aria-hidden="true"> →</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
