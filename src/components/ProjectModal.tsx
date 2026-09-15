"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
    useRef,
    useEffect,
} from "react";

import {
    createProject,
    updateProject,
} from "@/src/services/project";

interface Project {
    id: number;
    name: string;
    description: string | null;
}

interface ProjectModalProps {
    open: boolean;
    project?: Project | null;
    onClose: () => void;
    loadData: () => Promise<void>;
}

interface FormData {
    name: string;
    description: string;
}

export default function ProjectModal({
    open,
    project,
    onClose,
    loadData,
}: ProjectModalProps) {
    const modalRef =
        useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<FormData>();

    useEffect(() => {
        if (!open) return;

        if (project) {
            reset({
                name: project.name,
                description: project.description ?? "",
            });
        } else {
            reset({
                name: "",
                description: "",
            });
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open, project, reset, onClose]);

    if (!open) return null;

    const onSubmit = async (
        data: FormData
    ) => {
        try {
            if (project) {
                await updateProject(
                    project.id,
                    data
                );
            } else {
                await createProject(
                    data
                );
            }

            reset();
            onClose();
            await loadData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="w-full max-w-xl rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                            {project
                                ? "Edit Projek"
                                : "Tambah Projek"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {project
                                ? "Perbarui informasi projek."
                                : "Tambahkan projek baru."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6 p-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Judul Projek
                        </label>

                        <input
                            {...register("name", {
                                required: "Nama projek wajib diisi",
                                minLength: {
                                    value: 3,
                                    message: "Nama projek minimal 3 karakter",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Nama projek maksimal 100 karakter",
                                },
                            })}
                            placeholder="Contoh: Sistem Presensi"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">
                                {
                                    errors
                                        .name
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Deskripsi
                        </label>

                        <textarea
                            rows={5}
                            {...register(
                                "description"
                            )}
                            placeholder="Tuliskan deskripsi projek..."
                            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 cursor-pointer transition hover:bg-slate-100"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white cursor-pointer transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Menyimpan..."
                                : project
                                ? "Simpan Perubahan"
                                : "Simpan Projek"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
