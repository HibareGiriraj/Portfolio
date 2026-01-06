"use client";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDownload, HiArrowRight, HiChevronDown } from 'react-icons/hi';

export default function Hero() {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="blob blob-cyan absolute -top-1/2 -left-1/2 w-full h-full" style={{ animationDelay: '0s' }} />
                <div className="blob blob-blue absolute -bottom-1/2 -right-1/2 w-full h-full" style={{ animationDelay: '2s' }} />
                <div className="blob blob-cyan absolute top-1/4 right-0 w-1/2 h-1/2" style={{ animationDelay: '4s' }} />
            </div>

            <div className="text-center max-w-5xl mx-auto relative z-10 pt-16 md:pt-24">
                {/* Badge - Specific availability */}
                <div className="mb-8 animate-fade-in-up">
                    <span className="tag text-sm px-4 py-2">
                        🚀 Available for Full-Time MERN Roles
                    </span>
                </div>

                {/* Name and Title - Sequential Replacement Animation */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight relative min-h-[1.2em] w-full">
                    <span className="gradient-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-name-fade whitespace-nowrap">Giriraj Hibare</span>
                    <span className="gradient-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-title-fade whitespace-nowrap">Full Stack Developer</span>
                </h1>

                {/* Outcome-focused subtitle - NOT tools */}
                <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-6 font-medium animate-fade-in-up stagger-2 leading-relaxed px-4">
                    Building <span className="text-cyan-400 font-semibold">scalable web applications</span> with MERN stack
                </p>

                {/* Specific achievements with measurable value */}
                <p className="max-w-3xl mx-auto text-slate-400 text-base sm:text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up stagger-3 px-4">
                    I build <span className="text-white font-medium">payment systems</span> handling recurring transactions, 
                    <span className="text-white font-medium"> real-time features</span> for 500+ active users, and 
                    <span className="text-white font-medium"> production-ready MERN applications</span> that ship to real customers.
                </p>

                {/* What I do best - bullet list */}
                <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up stagger-3 px-4">
                    <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 text-slate-300 text-sm sm:text-base md:text-lg">
                        <li className="flex items-center gap-2">
                            <span className="text-cyan-400" aria-hidden="true">▹</span>
                            <span>Payment Integration & Billing</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-cyan-400" aria-hidden="true">▹</span>
                            <span>Real-time Features</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-cyan-400" aria-hidden="true">▹</span>
                            <span>Production Bug Fixes</span>
                        </li>
                    </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up stagger-4 px-4 w-full sm:w-auto">
                    <button
                        onClick={scrollToProjects}
                        className="btn-primary min-h-[44px]"
                        aria-label="View my featured projects"
                    >
                        See My Work
                        <HiArrowRight aria-hidden="true" />
                    </button>
                    <a
                        href="/resume/Giriraj_Hibare_Resume.pdf"
                        download="Giriraj_Hibare_Resume.pdf"
                        className="btn-secondary min-h-[44px]"
                        aria-label="Download my resume PDF"
                    >
                        <HiDownload aria-hidden="true" />
                        Download Resume
                    </a>
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
