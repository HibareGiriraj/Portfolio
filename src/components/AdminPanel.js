"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Convert techStack string "React, Mongo" -> ["React", "Mongo"]
        const payload = {
            ...formData,
            techStack: formData.techStack.split(',').map(item => item.trim())
        };

        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            setStatus('success');
            setFormData({ title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '' });
            router.refresh(); // Refresh server components to show new project
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400">Project Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white p-2" rows="3"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400">Image URL</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white p-2" placeholder="e.g. /projects/1.png" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400">Tech Stack (comma separated)</label>
                        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white p-2" placeholder="React, Node.js, MongoDB" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400">GitHub Link</label>
                        <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400">Live Link</label>
                        <input type="text" name="liveLink" value={formData.liveLink} onChange={handleChange} className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white p-2" />
                    </div>
                </div>

                <button disabled={status === 'loading'} type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2 px-4 rounded transition">
                    {status === 'loading' ? 'Saving...' : 'Add Project'}
                </button>

                {status === 'success' && <p className="text-green-400 text-center">Project added successfully!</p>}
                {status === 'error' && <p className="text-red-400 text-center">Failed to add project.</p>}
            </form>
        </div>
    );
}
