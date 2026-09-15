"use client";

import { useState } from "react";
import { SearchProvider } from "@/src/context/SearchContext";

import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";
import useAuth from "@/src/hooks/useAuth";

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useAuth();
    const [search, setSearch] = useState("");

    return (
        <SearchProvider>
            <div className="flex min-h-screen bg-slate-100">
                <Sidebar />

                <div className="flex flex-1 flex-col">
                    <Navbar />

                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SearchProvider>
    );
}
