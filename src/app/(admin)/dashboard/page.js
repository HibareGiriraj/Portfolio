import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";
import Link from "next/link";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <div className="text-slate-400">Welcome, {session.user.name}</div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Link
                        href="/dashboard"
                        className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2">➕ Add Project</h3>
                        <p className="text-slate-400 text-sm">Create new portfolio projects</p>
                    </Link>
                    <Link
                        href="/dashboard/projects"
                        className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2">📁 Manage Projects</h3>
                        <p className="text-slate-400 text-sm">Edit or delete existing projects</p>
                    </Link>
                    <Link
                        href="/dashboard/messages"
                        className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2">📬 Messages</h3>
                        <p className="text-slate-400 text-sm">View contact form submissions</p>
                    </Link>
                </div>

                {/* Add Project Form */}
                <AdminPanel />
            </div>
        </div>
    );
}
