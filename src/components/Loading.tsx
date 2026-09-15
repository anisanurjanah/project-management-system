"use client";

import { LoaderCircle } from "lucide-react";

interface LoadingProps {
    text?: string;
}

export default function Loading({
    text = "Memuat data...",
}: LoadingProps) {
    return (
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
            <LoaderCircle
                size={42}
                className="animate-spin text-blue-600"
            />

            <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-700">
                    Mohon Tunggu
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    {text}
                </p>
            </div>
        </div>
    );
}
