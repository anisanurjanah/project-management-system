"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban } from "lucide-react";

import LogoutButton from "./LogoutButton";

const menus = [
    {
        name: "Projects",
        href: "/projects",
        icon: FolderKanban,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-0 flex h-screen w-72 flex-col border-r bg-white">
            {/* Logo */}
            <div className="border-b p-7">
                <h1 className="text-2xl font-bold text-blue-600">
                    Project Management System
                </h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto space-y-2 p-5">
                {menus.map((menu) => {
                    const active =
                        pathname === menu.href;

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                            ${
                                active
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            <menu.icon size={19} />
                            {menu.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t p-5">
                <LogoutButton />
            </div>
        </aside>
    );
}
