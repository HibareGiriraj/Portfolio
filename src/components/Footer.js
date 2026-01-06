"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <img 
                            src="/giriraj_logo.png" 
                            alt="Giriraj Hibare Logo" 
                            className="h-6 w-auto opacity-80"
                        />
                        <p className="text-slate-400 text-sm">
                            © {currentYear} Giriraj Hibare
                        </p>
                    </div>

                    {/* Center */}
                    <p className="text-slate-500 text-sm">
                        Based in Pune, Maharashtra, India
                    </p>

                    {/* Right - Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/HibareGiriraj"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit my GitHub profile"
                            className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                        >
                            GitHub
                        </a>
                        <span className="text-slate-600">•</span>
                        <a
                            href="https://linkedin.com/in/girirajhibare"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit my LinkedIn profile"
                            className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
