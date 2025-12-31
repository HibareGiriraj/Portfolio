"use client";
import { useState } from 'react';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setStatusMessage(data.message || 'Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
                setStatusMessage(data.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage('Network error. Please check your connection and try again.');
        }
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Clear, specific heading */}
                <h2 className="section-title">Available for Full-Time MERN Roles</h2>

                {/* Specific CTA - not vague */}
                <div className="text-center mb-12">
                    <p className="text-slate-300 max-w-2xl mx-auto mb-4">
                        Looking for <span className="text-cyan-400">product-focused engineering teams</span> where I can build features that ship to real users.
                    </p>
                    <p className="text-slate-400 text-sm">
                        Open to: Full-time roles • Backend-heavy MERN opportunities • Startup environments
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>

                        <div className="space-y-6">
                            <a href="mailto:girirajhibare@outlook.com" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                    <HiMail className="text-xl text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Email</p>
                                    <p>girirajhibare@outlook.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                    <HiLocationMarker className="text-xl text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Location</p>
                                    <p>Pune, Maharashtra (Open to Remote)</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-700">
                            <a
                                href="https://github.com/HibareGiriraj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href="https://linkedin.com/in/girirajhibare"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FaLinkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder="Your Message..."
                                    className="w-full resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <p className="text-green-400 text-center text-sm bg-green-500/10 border border-green-500/30 rounded-lg py-3">
                                    {statusMessage}
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-400 text-center text-sm bg-red-500/10 border border-red-500/30 rounded-lg py-3">
                                    {statusMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
