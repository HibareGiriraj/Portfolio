"use client";
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function ProjectsManager() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: ''
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project._id || project.id);
        // Handle both naming conventions (stack/techStack, githubUrl/githubLink)
        const techStackValue = project.techStack || project.stack || [];
        const githubValue = project.githubLink || project.githubUrl || '';
        const liveValue = project.liveLink || project.liveUrl || '';

        setFormData({
            title: project.title || '',
            description: project.description || '',
            image: project.image || '',
            techStack: Array.isArray(techStackValue) ? techStackValue.join(', ') : (techStackValue || ''),
            githubLink: githubValue,
            liveLink: liveValue
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const payload = {
            ...formData,
            techStack: formData.techStack.split(',').map(item => item.trim())
        };

        try {
            const res = await fetch(`/api/projects/${editingProject}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus('success');
                setEditingProject(null);
                fetchProjects();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter(p => (p._id || p.id) !== id));
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleCancel = () => {
        setEditingProject(null);
        setFormData({
            title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: ''
        });
        setStatus('');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {editingProject && (
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Edit Project</h3>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Tech Stack (comma separated)</label>
                                <input
                                    type="text"
                                    name="techStack"
                                    value={formData.techStack}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">GitHub Link</label>
                                <input
                                    type="text"
                                    name="githubLink"
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Live Link</label>
                                <input
                                    type="text"
                                    name="liveLink"
                                    value={formData.liveLink}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-6 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                            >
                                {status === 'loading' ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                        {status === 'success' && <p className="text-green-400">Project updated successfully!</p>}
                        {status === 'error' && <p className="text-red-400">Failed to update project.</p>}
                    </form>
                </div>
            )}

            {projects.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                    <p>No projects yet. Add your first project from the dashboard!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project, index) => (
                        <div
                            key={project._id || project.id || `project-${index}`}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                        >
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full md:w-32 h-24 object-cover rounded-lg"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                                <p className="text-slate-400 text-sm mt-1 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {Array.isArray(project.techStack) && project.techStack.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-700 text-cyan-400 text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex md:flex-col gap-2 md:items-end">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id || project.id)}
                                    className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                >
                                    <FaTrash /> Delete
                                </button>
                                <div className="flex gap-2">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-slate-700 text-slate-400 rounded-lg hover:text-white transition-colors"
                                        >
                                            <FaGithub />
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-slate-700 text-slate-400 rounded-lg hover:text-white transition-colors"
                                        >
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
