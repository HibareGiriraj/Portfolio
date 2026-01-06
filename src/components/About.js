"use client";

export default function About() {
    return (
        <section id="about-me" className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="section-title mb-4">About</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Giriraj Hibare
                    </p>
                </div>

                <div className="glass-card p-8 md:p-12 rounded-2xl">
                    {/* Profile Header */}
                    <div className="text-center mb-10">
                        <div className="inline-block mb-6">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mx-auto flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg shadow-cyan-500/20">
                                GH
                            </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Giriraj Hibare</h3>
                        <p className="text-lg text-slate-400">Full-Stack Engineer (MERN + TypeScript)</p>
                    </div>

                    {/* About Content */}
                    <div className="space-y-6 text-slate-300 leading-relaxed">
                        <p className="text-base md:text-lg">
                            <strong className="text-white">I build production systems and solve real problems</strong> when complexity gets in the way. 
                            I specialize in payment integrations, real-time features, and scalable MERN applications that ship to real customers.
                        </p>

                        <p className="text-base md:text-lg">
                            <strong className="text-white">I ship features fast and iterate quickly.</strong> Leveraging React, Node.js, MongoDB, 
                            payment APIs (Razorpay), and modern tooling. Small PRs, rapid feedback, production-focused development.
                        </p>

                        <p className="text-base md:text-lg">
                            <strong className="text-white">My core philosophy is simplicity.</strong> If complexity balloons, I delete it and design 
                            the simpler path. I focus on building features that users actually need, not over-engineering solutions.
                        </p>

                        <p className="text-base md:text-lg">
                            Currently working at <span className="text-cyan-400 font-medium">Aii Venture Pvt. Ltd.</span> building subscription 
                            management systems handling recurring payments for 500+ active users. Fixed 20+ production bugs with zero critical 
                            incidents, and shipped revenue-critical features supporting business operations.
                        </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-10 pt-8 border-t border-slate-700">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">What I Do</h4>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Payment system integration & billing</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Real-time features & WebSocket connections</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Production bug fixes & debugging</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Full-stack MERN development</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">My Approach</h4>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Ship fast, iterate based on feedback</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Focus on production-ready code</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Simplify over complicate</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                        <span>Build for real users, not abstractions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

