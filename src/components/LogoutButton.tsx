"use client";

import { logout } from "@/src/services/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = async()=>{
        await logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    }

    return(
        <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
            Logout
        </button>
    )
}
