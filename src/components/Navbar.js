"use client";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    const isAdmin = session?.user?.email === 'admin@example.com';

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);

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

    // Close on escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen]);

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

                            <ThemeToggle />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={isOpen}
                            className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center z-[60]"
                        >
                            {isOpen ? <FaTimes size={20} aria-hidden="true" /> : <FaBars size={20} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay + Drawer */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden mobile-nav-backdrop"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    {/* Drawer */}
                    <div className="fixed top-0 right-0 h-full w-[280px] max-w-[85vw] z-[56] md:hidden mobile-nav-drawer glass border-l border-slate-700">
                        <div className="pt-20 px-6 pb-6 h-full overflow-y-auto">
                            <nav className="space-y-1" aria-label="Mobile navigation">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => scrollToSection(link.href)}
                                        className={`block w-full text-left text-base font-medium py-3.5 px-4 rounded-lg min-h-[48px] transition-all ${activeSection === link.href.replace('#', '')
                                                ? 'text-cyan-400 bg-cyan-400/10'
                                                : 'text-slate-300 hover:text-cyan-400 hover:bg-white/5'
                                            }`}
                                        aria-label={link.label}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                {isAdmin && (
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-slate-300 text-base font-medium py-3.5 px-4 rounded-lg min-h-[48px] hover:text-cyan-400 hover:bg-white/5 transition-all"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </nav>

                            {/* Theme toggle in mobile drawer */}
                            <div className="mt-8 pt-6 border-t border-slate-700/50 flex items-center justify-between">
                                <span className="text-sm text-slate-400">Theme</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
