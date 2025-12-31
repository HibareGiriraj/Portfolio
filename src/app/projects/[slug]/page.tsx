import { Metadata } from 'next';
import { getProjectBySlug, getAllSlugs } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate static params for all project slugs
export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found | Giriraj Hibare',
        };
    }

    return {
        title: `${project.title} | Giriraj Hibare`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.image ? [project.image] : [],
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8"
                >
                    <FaArrowLeft size={12} /> Back to Projects
                </Link>

                {/* Project Header */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {project.title}
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        {project.description}
                    </p>
                </header>

                {/* Project Image */}
                {project.image && (
                    <div className="mb-8 rounded-lg overflow-hidden border border-slate-800">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-64 md:h-80 object-cover"
                        />
                    </div>
                )}

                {/* Tech Stack */}
                <section className="mb-8">
                    <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Tech Stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="mb-8">
                    <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Key Features
                    </h2>
                    <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-400">
                                <span className="text-white mt-1">•</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Long Description */}
                {project.longDescription && (
                    <section className="mb-8">
                        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                            Project Details
                        </h2>
                        <div className="text-slate-400 leading-relaxed whitespace-pre-line">
                            {project.longDescription}
                        </div>
                    </section>
                )}

                {/* Links */}
                <section className="flex gap-4 pt-4 border-t border-slate-800">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-sm"
                        >
                            <FaGithub size={16} /> View Code
                        </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md hover:bg-slate-200 transition-colors text-sm"
                        >
                            <FaExternalLinkAlt size={14} /> Live Demo
                        </a>
                    )}
                </section>
            </div>
        </main>
    );
}
