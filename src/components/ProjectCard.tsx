"use client";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import {
    deleteProject,
} from "@/src/services/project";

interface ProjectCardProps {
    id: number;
    name: string;
    description: string;
    active?: boolean;
    onClick?: () => void;
    onEdit?: () => void;
    loadData: () => Promise<void>;
}

export default function ProjectCard({
    id,
    name,
    description,
    active = false,
    onClick,
    onEdit,
    loadData,
}: ProjectCardProps) {

    const handleDelete = async () => {
        const confirmed = confirm(
            "Yakin ingin menghapus projek ini?"
        );

        if (!confirmed) return;

        try {
            await deleteProject(id);
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        onEdit?.();
    };

    return (
        <div
            onClick={onClick}
            className={`
                w-full cursor-pointer rounded-2xl border p-5 text-left transition-all duration-200
                ${
                    active
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                }
            `}
        >
            {/* Project Information */}
            <h3 className="line-clamp-1 text-lg font-semibold text-slate-800">
                {name}
            </h3>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                {description || "Tidak ada deskripsi projek."}
            </p>

            {/* Action */}
            <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                <button
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 cursor-pointer transition hover:bg-blue-50"
                >
                    <Pencil size={16} />
                    Edit
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 cursor-pointer transition hover:bg-red-50"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
        </div>
    );
}
