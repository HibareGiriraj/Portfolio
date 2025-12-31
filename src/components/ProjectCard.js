import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectCard({ project }) {
    return (
        <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-colors">
            {/* Image Container */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />

                {/* Links Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
                        >
                            <FaGithub size={18} />
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
                        >
                            <FaExternalLinkAlt size={16} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                </h3>
                <p className="text-slate-500 text-sm mb-3 leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* Key Focus */}
                {project.keyFocus && (
                    <p className="text-xs text-slate-600 mb-4">
                        <span className="text-slate-400">Focus:</span> {project.keyFocus}
                    </p>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, index) => (
                        <span
                            key={index}
                            className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
