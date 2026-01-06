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
                        <p className="text-lg text-slate-400">Full-Stack Engineer (MERN Stack)</p>
                    </div>

                    {/* Bold Outcomes First */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">500+</div>
                            <div className="text-xs text-slate-400">Active Users</div>
                        </div>
                        <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">20+</div>
                            <div className="text-xs text-slate-400">Bugs Fixed</div>
                        </div>
                        <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">2+</div>
                            <div className="text-xs text-slate-400">Production Apps</div>
                        </div>
                        <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">0</div>
                            <div className="text-xs text-slate-400">Critical Incidents</div>
                        </div>
                    </div>

                    {/* Key Outcomes as Bullets */}
                    <div className="mb-8">
                        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Outcomes</h4>
                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1 font-bold text-lg" aria-hidden="true">▸</span>
                                <div>
                                    <strong className="text-white">Built payment systems</strong> handling recurring transactions for <strong className="text-cyan-400">500+ active users</strong>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1 font-bold text-lg" aria-hidden="true">▸</span>
                                <div>
                                    <strong className="text-white">Fixed 20+ production bugs</strong> with <strong className="text-cyan-400">zero critical incidents</strong> post-fix
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1 font-bold text-lg" aria-hidden="true">▸</span>
                                <div>
                                    <strong className="text-white">Shipped revenue-critical features</strong> supporting business operations and monthly recurring revenue workflows
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1 font-bold text-lg" aria-hidden="true">▸</span>
                                <div>
                                    Currently at <span className="text-cyan-400 font-medium">Aii Venture Pvt. Ltd.</span> building subscription management systems
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Philosophy - Concise */}
                    <div className="border-t border-slate-700 pt-6">
                        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Philosophy</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                <span><strong className="text-white">Ship fast, iterate quickly</strong> — Small PRs, rapid feedback, production-focused</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                <span><strong className="text-white">Simplicity over complexity</strong> — Delete complexity, design simpler paths</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1" aria-hidden="true">▸</span>
                                <span><strong className="text-white">Build for real users</strong> — Not abstractions or over-engineering</span>
                            </li>
                        </ul>
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

