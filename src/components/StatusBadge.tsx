"use client";

import {
    Circle,
    Loader2,
    CheckCircle2,
} from "lucide-react";

type Status = "todo" | "progress" | "done";

interface Props {
    status: Status;
    onClick?: () => void;
}

export default function StatusBadge({
    status,
    onClick,
}: Props) {
    const styles: Record<
        Status,
        {
            label: string;
            className: string;
            icon: React.ReactNode;
        }
    > = {
        todo: {
            label: "Todo",
            className:
                "bg-slate-100 text-slate-700 border border-slate-200",
            icon: <Circle size={14} />,
        },
        progress: {
            label: "Progress",
            className:
                "bg-amber-100 text-amber-700 border border-amber-200",
            icon: <Loader2 size={14} />,
        },
        done: {
            label: "Done",
            className:
                "bg-emerald-100 text-emerald-700 border border-emerald-200",
            icon: <CheckCircle2 size={14} />,
        },
    };

    const item = styles[status];

    return (
        <span
            onClick={onClick}
            className={`
                inline-flex items-center gap-2
                rounded-full px-3 py-1.5
                text-xs font-medium
                transition-all duration-200
                ${item.className}
                ${
                    onClick
                        ? "cursor-pointer hover:opacity-80"
                        : "cursor-default"
                }
            `}
        >
            {item.icon}
            {item.label}
        </span>
    );
}
