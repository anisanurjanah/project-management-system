"use client";

import { useEffect, useRef, useState } from "react";
import {
    Pencil,
    Trash2,
    ChevronDown,
} from "lucide-react";

import {
    deleteTask,
    updateTaskStatus,
} from "@/src/services/project";

import StatusBadge from "./StatusBadge";

type Status = "todo" | "progress" | "done";

interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
}

interface Props {
    task: Task;
    loadData: () => void;
    onEdit: (task: Task) => void;
}

export default function TaskCard({
    task,
    loadData,
    onEdit,
}: Props) {
    const [openStatus, setOpenStatus] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenStatus(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleDelete = async () => {
        const confirmed = confirm(
            "Yakin ingin menghapus task ini?"
        );

        if (!confirmed) return;

        try {
            await deleteTask(task.id);
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeStatus = async (
        status: Status
    ) => {
        try {
            await updateTaskStatus(task.id, status);
            setOpenStatus(false);
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const statuses: Status[] = [
        "todo",
        "progress",
        "done",
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="line-clamp-1 text-lg font-semibold text-slate-800">
                        {task.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {task.description ||
                            "Tidak ada deskripsi."}
                    </p>
                </div>

                <div
                    className="relative"
                    ref={dropdownRef}
                >
                    <button
                        type="button"
                        onClick={() =>
                            setOpenStatus(!openStatus)
                        }
                        className="flex items-center gap-1"
                    >
                        <StatusBadge
                            status={task.status}
                        />

                        <ChevronDown
                            size={16}
                            className={`transition-transform ${
                                openStatus
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                    </button>

                    {openStatus && (
                        <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                            {statuses
                                .filter(
                                    (status) =>
                                        status !== task.status
                                )
                                .map((status) => (
                                    <button
                                        key={status}
                                        onClick={() =>
                                            handleChangeStatus(
                                                status
                                            )
                                        }
                                        className="block w-full px-4 py-3 text-left text-sm capitalize transition hover:bg-slate-100"
                                    >
                                        {status}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                <button
                    onClick={() => onEdit(task)}
                    className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                >
                    <Pencil size={16} />
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
        </div>
    );
}
