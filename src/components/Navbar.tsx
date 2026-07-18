"use client";

import { useEffect, useState } from "react";
import { profile } from "@/src/services/auth";

interface User {
    name: string;
    email: string;
}

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await profile();
            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
            <h2 className="text-xl font-semibold">
                Dashboard
            </h2>

            <div className="text-right">
                <p className="font-medium">
                    {user?.name}
                </p>

                <small className="text-gray-500">
                    {user?.email}
                </small>
            </div>
        </header>
    );
}
