import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MessagesManager from "@/components/MessagesManager";

export default async function Messages() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
                    <a href="/dashboard" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        ← Back to Dashboard
                    </a>
                </div>
                <MessagesManager />
            </div>
        </div>
    );
}
