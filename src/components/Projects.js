import { getPublishedProjects } from '@/lib/projects';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
    const projects = getPublishedProjects();

    return (
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="section-title mb-4">Latest Projects</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Production systems I've built and maintained
                    </p>
                </div>

                <div className="space-y-8">
                    {projects.map((project) => (
                        <article
                            key={project.slug}
                            className="glass-card overflow-hidden"
                        >
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

                                {/* Content - Case Study Format */}
                                <div className="md:col-span-2 p-6 md:p-8">
                                    <div className="mb-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Impact Metrics First - Bold Outcomes */}
                                    {project.impact && project.impact.length > 0 && (
                                        <div className="mb-6">
                                            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">Impact Metrics</h4>
                                            <ul className="space-y-2 mb-4">
                                                {project.impact.map((metric, idx) => {
                                                    // Extract and bold numbers
                                                    const parts = metric.split(/(\d+\+?|80%|Zero)/);
                                                    return (
                                                        <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                                                            <span className="text-cyan-400 mt-1 font-bold" aria-hidden="true">▸</span>
                                                            <span>
                                                                {parts.map((part, i) => {
                                                                    if (/\d+\+?|80%|Zero/i.test(part)) {
                                                                        return <strong key={i} className="text-cyan-400 font-bold">{part}</strong>;
                                                                    }
                                                                    return <span key={i}>{part}</span>;
                                                                })}
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Description - Concise Bullets */}
                                    <div className="mb-6">
                                        <ul className="space-y-2">
                                            <li className="text-slate-300 text-sm flex items-start gap-2">
                                                <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                                <span>{project.description}</span>
                                            </li>
                                            {project.longDescription && (
                                                <li className="text-slate-300 text-sm flex items-start gap-2">
                                                    <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
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

                                    {/* Features as Bullets */}
                                    {project.features && project.features.length > 0 && (
                                        <div className="border-t border-slate-700 pt-4 mb-4">
                                            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">Key Features</h4>
                                            <ul className="space-y-1.5">
                                                {project.features.map((feature, i) => (
                                                    <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Clear CTAs */}
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
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
                                        {project.liveUrl && project.liveUrl !== '#' && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary text-sm min-h-[44px] px-4"
                                                aria-label={`View ${project.title} live demo`}
                                            >
                                                <FaExternalLinkAlt aria-hidden="true" />
                                                <span className="hidden sm:inline">Live Demo</span>
                                                <span className="sm:hidden">Demo</span>
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
