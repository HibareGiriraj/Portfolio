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

            <div className="text-center max-w-4xl mx-auto relative z-10">
                {/* Badge - Specific availability */}
                <div className="mb-6 animate-fade-in-up">
                    <span className="tag">
                        🚀 Available for Full-Time MERN Roles
                    </span>
                </div>

                {/* Name */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up stagger-1">
                    Hi, I'm <span className="gradient-text">Giriraj Hibare</span>
                </h1>

                {/* Outcome-focused subtitle - NOT tools */}
                <p className="text-xl md:text-2xl text-slate-300 mb-4 animate-fade-in-up stagger-2">
                    I build <span className="text-cyan-400">revenue-driven web applications</span> focused on payments, automation & production reliability
                </p>

                {/* Specific achievements, not duration */}
                <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed animate-fade-in-up stagger-3">
                    Shipped <span className="text-white">subscription systems with Razorpay</span>,
                    automated <span className="text-white">WhatsApp notifications for 500+ users</span>,
                    and maintained <span className="text-white">production applications</span> with zero critical downtime.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up stagger-4">
                    <button
                        onClick={scrollToProjects}
                        className="btn-primary"
                    >
                        See My Work
                        <HiArrowRight />
                    </button>
                    <a
                        href="/resume/Giriraj_Hibare_Resume.pdf"
                        download="Giriraj_Hibare_Resume.pdf"
                        className="btn-secondary"
                    >
                        <HiDownload />
                        Download Resume
                    </a>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <a
                        href="https://github.com/HibareGiriraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="https://linkedin.com/in/girirajhibare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToProjects}
                className="absolute bottom-8 left-1/2 animate-bounce-slow text-cyan-400 hover:text-cyan-300 transition-colors"
            >
                <HiChevronDown size={32} />
            </button>
        </section>
    );
}
