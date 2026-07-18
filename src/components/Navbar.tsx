"use client";

import { useEffect, useState } from "react";
import {
    Search,
} from "lucide-react";

import { useSearch } from "@/src/context/SearchContext";
import { profile } from "@/src/services/auth";

interface User {
    name: string;
    email: string;
}

export default function Navbar(){    
    const [user, setUser] = useState<User | null>(null);
    const {
        search,
        setSearch,
    } = useSearch();

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await profile();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="flex h-20 items-center justify-between border-b bg-white px-8">
            {/* Left */}
            <div>
                <h1 className="text-2xl font-bold">
                    Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                    Welcome back 👋
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">
                {/* Search */}
                <div className="hidden items-center rounded-xl border bg-gray-50 px-4 py-2 lg:flex">
                    <Search
                        size={18}
                        className="mr-2 text-gray-400"
                    />
                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Cari task..."
                        className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                        {user?.name?.charAt(0)}
                    </div>

                    <div className="hidden md:block">
                        <p className="font-semibold">
                            {user?.name}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
