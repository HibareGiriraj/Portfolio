"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    {/* Left */}
                    <div>
                        <p className="gradient-text font-bold text-lg">
                            Giriraj Hibare
                        </p>
                        <p className="text-slate-500 text-sm">
                            © {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Center */}
                    <p className="text-slate-400 text-sm">
                        Full-Stack MERN Developer | Pune, Maharashtra
                    </p>

                    {/* Right - Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/HibareGiriraj"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="social-icon"
                        >
                            <FaGithub size={16} />
                        </a>
                        <a
                            href="https://linkedin.com/in/girirajhibare"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            className="social-icon"
                        >
                            <FaLinkedin size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
