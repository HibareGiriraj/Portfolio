"use client";
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDownload, HiArrowRight, HiChevronDown } from 'react-icons/hi';

export default function Hero() {
    // Mount guard: server renders the placeholder, client renders the full hero.
    // This eliminates hydration mismatch from stale Turbopack SSR cache.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Server-rendered placeholder — same outer structure, no complex children
    if (!mounted) {
        return (
            <section id="about" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="text-center w-full max-w-4xl mx-auto relative z-10 pt-20 md:pt-24" />
            </section>
        );
    }

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="blob blob-cyan absolute -top-1/2 -left-1/2 w-full h-full" style={{ animationDelay: '0s' }} />
                <div className="blob blob-blue absolute -bottom-1/2 -right-1/2 w-full h-full" style={{ animationDelay: '2s' }} />
                <div className="blob blob-cyan absolute top-1/4 right-0 w-1/2 h-1/2" style={{ animationDelay: '4s' }} />
            </div>

            <div className="text-center w-full max-w-4xl mx-auto relative z-10 pt-20 md:pt-24">
                {/* Hero - Name & Title */}
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight relative min-h-[1.2em]">
                        <span className="gradient-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap animate-name-fade">Giriraj Hibare</span>
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full animate-title-fade">
                            <span className="block sm:inline">Full-Stack Developer</span>{' '}
                            <span className="hidden sm:inline text-slate-400">|</span>{' '}
                            <span className="gradient-text block sm:inline">MERN Stack</span>
                        </span>
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-medium px-2">
                        I build reliable backend systems and polished user-facing apps.
                    </p>
                    <p className="text-sm sm:text-lg text-cyan-400 font-semibold">
                        Available for full-time roles.
                    </p>
                </div>

                {/* Bold Statistics — always 3 columns */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in-up stagger-2">
                    <div className="glass-card p-3 sm:p-6 rounded-xl">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">500+</div>
                        <div className="text-xs sm:text-sm text-slate-400">Active Users</div>
                    </div>
                    <div className="glass-card p-3 sm:p-6 rounded-xl">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">2+</div>
                        <div className="text-xs sm:text-sm text-slate-400">Production Apps</div>
                    </div>
                    <div className="glass-card p-3 sm:p-6 rounded-xl">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">20+</div>
                        <div className="text-xs sm:text-sm text-slate-400">Bugs Fixed</div>
                    </div>
                </div>

                {/* Experience & Scale */}
                <div className="max-w-3xl mx-auto mb-8 sm:mb-12 space-y-6 animate-fade-in-up stagger-3">
                    <div className="glass-card p-4 sm:p-6 rounded-xl">
                        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-left text-sm sm:text-base">Experience & Scale</h3>
                        <ul className="space-y-2 text-left text-slate-300 text-xs sm:text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-0.5 shrink-0" aria-hidden="true">▸</span>
                                <span><strong className="text-white">Proficient</strong> in React, Node.js, MongoDB — used in production for 2+ apps</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-0.5 shrink-0" aria-hidden="true">▸</span>
                                <span><strong className="text-white">Payment systems</strong> handling recurring transactions for 500+ users</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-0.5 shrink-0" aria-hidden="true">▸</span>
                                <span><strong className="text-white">Real-time features</strong> with WebSocket connections</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 animate-fade-in-up stagger-4 w-full">
                    <button
                        onClick={scrollToProjects}
                        className="btn-primary min-h-[44px] w-full sm:w-auto"
                        aria-label="View my featured projects"
                    >
                        View Projects
                        <HiArrowRight aria-hidden="true" />
                    </button>
                    <a
                        href="/resume/Giriraj_Hibare_Resume.pdf"
                        download="Giriraj_Hibare_Resume.pdf"
                        className="btn-secondary min-h-[44px] w-full sm:w-auto"
                        aria-label="Download my resume PDF"
                    >
                        <HiDownload aria-hidden="true" />
                        Resume
                    </a>
                    <button
                        onClick={scrollToContact}
                        className="btn-secondary min-h-[44px] w-full sm:w-auto"
                        aria-label="Contact me"
                    >
                        Hire Me
                    </button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <a
                        href="https://github.com/HibareGiriraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit my GitHub profile"
                        className="social-icon"
                    >
                        <FaGithub size={20} aria-hidden="true" />
                    </a>
                    <a
                        href="https://linkedin.com/in/girirajhibare"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit my LinkedIn profile"
                        className="social-icon"
                    >
                        <FaLinkedin size={20} aria-hidden="true" />
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToProjects}
                aria-label="Scroll to projects section"
                className="absolute bottom-8 left-1/2 animate-bounce-slow text-cyan-400 hover:text-cyan-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
                <HiChevronDown size={32} aria-hidden="true" />
            </button>
        </section>
    );
}
