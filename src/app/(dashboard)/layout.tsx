"use client";

import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";
import useAuth from "@/src/hooks/useAuth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useAuth();

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
