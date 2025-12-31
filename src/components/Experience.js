"use client";
import { HiBriefcase, HiLocationMarker } from 'react-icons/hi';

const experience = [
    {
        company: "Aii Venture Pvt. Ltd.",
        role: "Full-Stack Developer",
        period: "Aug 2024 – Present",
        location: "Pune",
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
        highlights: [
            "Improved mobile responsiveness across 15+ pages, achieving consistent cross-device experience for educational platform users",
            "Reduced layout bugs by 80% through systematic implementation of breakpoints and media queries",
            "Enhanced accessibility compliance leading to improved user engagement metrics",
            "Delivered pixel-perfect UI aligned with Figma designs within tight sprint deadlines"
        ]
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
            <div className="max-w-4xl mx-auto">
                <h2 className="section-title">Work Experience</h2>

                <div className="space-y-8">
                    {experience.map((exp, i) => (
                        <div
                            key={i}
                            className="glass-card p-8"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                                    <p className="text-xl text-slate-300">{exp.company}</p>
                                </div>
                                <div className="text-slate-400 mt-2 md:mt-0 md:text-right">
                                    <div className="flex items-center gap-2 md:justify-end">
                                        <HiBriefcase size={16} />
                                        {exp.period}
                                    </div>
                                    <div className="flex items-center gap-2 md:justify-end text-sm">
                                        <HiLocationMarker size={14} />
                                        {exp.location}
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {exp.highlights.map((highlight, j) => (
                                    <li key={j} className="text-slate-300 flex items-start gap-3">
                                        <span className="text-cyan-400 mt-1">▹</span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
