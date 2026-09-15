"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";

interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
}

export default function Button({
    children,
    loading = false,
    className = "",
    disabled,
    type = "button",
    ...props
}: Props) {
    return (
        <button
            type={type}
            disabled={loading || disabled}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-xl bg-blue-600
                px-5 py-3
                text-sm font-medium text-white
                cursor-pointer
                transition-all duration-200
                hover:bg-blue-700
                focus:outline-none
                focus:ring-4
                focus:ring-blue-100
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${className}
            `}
            {...props}
        >
            {loading && (
                <LoaderCircle
                    size={18}
                    className="animate-spin"
                />
            )}

            {loading ? "Memproses..." : children}
        </button>
    );
}
