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
                body: JSON.stringify({
                    ...formData,
                    website: '' // Honeypot field - should always be empty
                })
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
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Clear, specific heading */}
                <div className="text-center mb-16">
                    <h2 className="section-title mb-4">Let's Work Together</h2>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-2">
                        Building something amazing? <span className="text-cyan-400 font-semibold">Let's chat.</span>
                    </p>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto">
                        I build fast, accessible web apps with React, Next.js, and Node.js. Looking for teams that value product quality, performance, and thoughtful UX.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Contact Info */}
                    <div className="glass-card p-6 md:p-8 rounded-2xl">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Get In Touch</h3>

                        <div className="space-y-6 mb-8">
                            <a 
                                href="mailto:girirajhibare@outlook.com" 
                                className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group min-h-[44px]"
                                aria-label="Send email to girirajhibare@outlook.com"
                            >
                                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors min-h-[44px] min-w-[44px]">
                                    <HiMail className="text-xl text-cyan-400" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Email</p>
                                    <p className="font-medium">girirajhibare@outlook.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                    <HiLocationMarker className="text-xl text-cyan-400" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Location</p>
                                    <p className="font-medium">Pune, Maharashtra</p>
                                    <p className="text-slate-500 text-xs mt-1">Open to Remote</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links - Cleaner */}
                        <div className="pt-6 border-t border-slate-700">
                            <p className="text-slate-500 text-sm mb-3">Socials</p>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/HibareGiriraj"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit my GitHub profile"
                                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                                >
                                    GitHub
                                </a>
                                <span className="text-slate-600">•</span>
                                <a
                                    href="https://linkedin.com/in/girirajhibare"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit my LinkedIn profile"
                                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card p-6 md:p-8 rounded-2xl">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            {/* Honeypot field for spam protection */}
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ position: 'absolute', left: '-9999px' }}
                                aria-hidden="true"
                            />
                            
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-2">
                                    Your Name <span className="text-red-400" aria-label="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    className="w-full"
                                    aria-required="true"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-2">
                                    Your Email <span className="text-red-400" aria-label="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                    className="w-full"
                                    aria-required="true"
                                    autoComplete="email"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="contact-subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject (optional)"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-2">
                                    Your Message <span className="text-red-400" aria-label="required">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder="Your Message..."
                                    className="w-full resize-none"
                                    aria-required="true"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                                aria-label={status === 'loading' ? 'Sending message' : 'Submit contact form'}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <div 
                                    role="alert" 
                                    aria-live="polite"
                                    className="text-green-400 text-center text-sm bg-green-500/10 border border-green-500/30 rounded-lg py-3"
                                >
                                    ✓ {statusMessage}
                                </div>
                            )}
                            {status === 'error' && (
                                <div 
                                    role="alert" 
                                    aria-live="assertive"
                                    className="text-red-400 text-center text-sm bg-red-500/10 border border-red-500/30 rounded-lg py-3"
                                >
                                    ✗ {statusMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
