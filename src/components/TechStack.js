"use client";
import {
    SiReact, SiNodedotjs, SiMongodb, SiExpress,
    SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
    SiGit, SiDocker, SiPostgresql, SiHtml5, SiCss3, SiBootstrap
} from 'react-icons/si';

// Skills organized by proficiency level with icons
const coreSkills = [
    { name: "React", icon: SiReact },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
];

const supportingSkills = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Git", icon: SiGit },
];

const familiarSkills = [
    { name: "TypeScript", icon: SiTypescript },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Docker", icon: SiDocker },
    { name: "HTML5", icon: SiHtml5 },
    { name: "CSS3", icon: SiCss3 },
    { name: "Bootstrap", icon: SiBootstrap },
];

function SkillCard({ skill }) {
    return (
        <div className="skill-card bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col items-center justify-center gap-3 cursor-default">
            <skill.icon className="text-3xl text-slate-400 transition-all duration-300" />
            <span className="text-slate-500 text-sm font-medium">
                {skill.name}
            </span>
        </div>
    );
}

export default function TechStack() {
    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
            <div className="max-w-6xl mx-auto">
                <h2 className="section-title">Tech Stack</h2>
                <p className="text-slate-400 text-center mb-12">
                    Core technologies I use to build applications
                </p>

                {/* Core Skills */}
                <div className="mb-10">
                    <h3 className="text-xs font-medium text-cyan-400 mb-4 text-center uppercase tracking-wider">
                        Core Stack
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {coreSkills.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* Supporting Skills */}
                <div className="mb-10">
                    <h3 className="text-xs font-medium text-slate-400 mb-4 text-center uppercase tracking-wider">
                        Supporting Tools
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {supportingSkills.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* Familiar Skills */}
                <div>
                    <h3 className="text-xs font-medium text-slate-500 mb-4 text-center uppercase tracking-wider">
                        Also Familiar With
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {familiarSkills.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
