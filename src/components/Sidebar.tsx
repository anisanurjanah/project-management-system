"use client";

import Link from "next/link";
import { Home, FolderKanban, User } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow-md">
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-blue-600">
                    TaskFlow
                </h1>
            </div>

            <nav className="space-y-2 p-5">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-50"
                >
                    <Home size={18} />
                    Dashboard
                </Link>

                <Link
                    href="/projects"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-50"
                >
                    <FolderKanban size={18} />
                    Projects
                </Link>

                <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-50"
                >
                    <User size={18} />
                    Profile
                </Link>
            </nav>

            <div className="absolute bottom-5 left-5">
                <LogoutButton />
            </div>
        </aside>
    );
}
