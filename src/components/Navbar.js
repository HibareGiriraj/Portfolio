"use client";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    const isAdmin = session?.user?.email === 'admin@example.com';

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
            setScrolled(window.scrollY > 50);

            // Track active section
                    const sections = ['about', 'about-me', 'experience', 'projects', 'skills', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "#about", label: "Home" },
        { href: "#about-me", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
        { href: "#skills", label: "Skills" },
        { href: "#contact", label: "Contact" },
    ];

    const scrollToSection = (href) => {
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <header>
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'glass shadow-lg py-3'
                : 'bg-transparent py-5'
                }`}
                role="navigation"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl md:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
                        GH
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`text-sm font-medium transition-colors min-h-[44px] px-3 ${activeSection === link.href.replace('#', '')
                                    ? 'text-cyan-400'
                                    : 'text-slate-400 hover:text-cyan-400'
                                    }`}
                                aria-label={link.label}
                            >
                                {link.label}
                            </button>
                        ))}

                        {isAdmin && (
                            <Link
                                href="/dashboard"
                                className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isOpen}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                        {isOpen ? <FaTimes size={20} aria-hidden="true" /> : <FaBars size={20} aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-slate-700 animate-fade-in-up">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className="block w-full text-left text-slate-300 hover:text-cyan-400 text-sm font-medium py-3 min-h-[44px] transition-colors"
                                aria-label={link.label}
                            >
                                {link.label}
                            </button>
                        ))}
                        {isAdmin && (
                            <Link
                                href="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="block text-slate-300 text-sm font-medium py-2"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
        </header>
    );
}
