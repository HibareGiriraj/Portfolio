"use client";
import { HiBriefcase, HiLocationMarker, HiArrowRight } from 'react-icons/hi';

const experience = [
    {
        company: "AiiVenture Solutions Pvt Ltd",
        role: "Full-Stack Developer",
        period: "Aug 2024 – Present",
        location: "Pune",
        product: "GiftyGen",
        projectSlug: "giftygen",
        highlights: [
            "Built end-to-end subscription management system with Razorpay handling recurring payments and automated billing for live paying customers",
            "Implemented automated WhatsApp notification pipeline delivering gift-cards, payment confirmations & expiry alerts to 500+ users",
            "Developed real-time subscription tracking dashboard reducing customer support queries by connecting React frontend with Node.js APIs",
            "Fixed 20+ production bugs across authentication, payment flows, and notification delivery with zero critical incidents post-fix",
            "Shipped revenue-critical features supporting business operations and monthly recurring revenue workflows"
        ]
    },
    {
        company: "STUDIESHQ",
        role: "Frontend Developer",
        period: "2024",
        location: "Remote",
        product: "StudiesHQ Platform",
        projectSlug: "studieshq",
        highlights: [
            "Improved mobile responsiveness across 15+ pages, achieving consistent cross-device experience for educational platform users",
            "Reduced layout bugs by 80% through systematic implementation of breakpoints and media queries",
            "Enhanced accessibility compliance leading to improved user engagement metrics",
            "Delivered pixel-perfect UI aligned with Figma designs within tight sprint deadlines"
        ]
    }
];

export default function Experience() {
    const scrollToProject = (slug) => {
        const el = document.getElementById(`project-${slug}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            // Brief highlight effect
            el.classList.add('ring-2', 'ring-cyan-400/50');
            setTimeout(() => el.classList.remove('ring-2', 'ring-cyan-400/50'), 2000);
        }
    };

    return (
        <section id="experience" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8 sm:mb-16">
                    <h2 className="section-title mb-4">Work Experience</h2>
                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                        Building production applications and solving real-world problems
                    </p>
                </div>

                <div className="space-y-8">
                    {experience.map((exp, i) => (
                        <div
                            key={i}
                            className="glass-card p-5 sm:p-6 md:p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-2">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">{exp.role}</h3>
                                    <p className="text-lg sm:text-xl text-slate-300">{exp.company}</p>
                                    {exp.product && (
                                        <p className="text-sm text-slate-400 mt-1">
                                            Product: <span className="text-cyan-400 font-medium">{exp.product}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="text-slate-400 md:text-right">
                                    <div className="flex items-center gap-2 md:justify-end">
                                        <HiBriefcase size={16} aria-hidden="true" />
                                        <span className="text-sm">{exp.period}</span>
                                    </div>
                                    <div className="flex items-center gap-2 md:justify-end text-sm">
                                        <HiLocationMarker size={14} aria-hidden="true" />
                                        <span>{exp.location}</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {exp.highlights.map((highlight, j) => {
                                    const parts = highlight.split(/(\d+\+?)/);

                                    return (
                                        <li key={j} className="text-slate-300 flex items-start gap-3 text-sm md:text-base leading-relaxed">
                                            <span className="text-cyan-400 mt-1.5 font-bold text-lg shrink-0" aria-hidden="true">▸</span>
                                            <span>
                                                {parts.map((part, idx) => {
                                                    if (/\d+\+?/.test(part)) {
                                                        return <strong key={idx} className="text-cyan-400 font-bold">{part}</strong>;
                                                    }
                                                    if (part.toLowerCase().includes('zero') || part.toLowerCase().includes('80%')) {
                                                        return <strong key={idx} className="text-white font-semibold">{part}</strong>;
                                                    }
                                                    return <span key={idx}>{part}</span>;
                                                })}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* View Project Link */}
                            {exp.projectSlug && (
                                <div className="mt-6 pt-4 border-t border-slate-700/50">
                                    <button
                                        onClick={() => scrollToProject(exp.projectSlug)}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group min-h-[44px]"
                                        aria-label={`View ${exp.product || exp.company} project details`}
                                    >
                                        View {exp.product || 'Project'} Details
                                        <HiArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
