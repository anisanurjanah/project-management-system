"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { logout } from "@/src/services/auth";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin keluar dari aplikasi?"
        );

        if (!confirmed) return;

        try {
            await logout();
        } catch (error) {
            console.error(error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            router.replace("/login");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:text-red-700"
        >
            <LogOut size={18} />
            Logout
        </button>
    );
}
