"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
    useEffect,
    useRef,
} from "react";

import {
    createTask,
    updateTask,
} from "@/src/services/project";

interface TaskModalProps {
    open: boolean;
    projectId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    task?: any;
    onClose: () => void;
    loadData: () => void;
}

interface FormData {
    title: string;
    description: string;
}

export default function TaskModal({
    open,
    projectId,
    task,
    onClose,
    loadData,
}: TaskModalProps) {
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
        if (task) {
            reset({
                title: task.title,
                description: task.description,
            });
        } else {
            reset({
                title: "",
                description: "",
            });
        }
    }, [task, reset]);

    useEffect(() => {
        const handleEsc = (
            e: KeyboardEvent
        ) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleEsc
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleEsc
            );
        };
    }, [onClose]);

    if (!open) return null;

    const onSubmit = async (
        data: FormData
    ) => {
        try {
            if (task) {
                await updateTask(
                    task.id,
                    data
                );
            } else {
                await createTask(
                    projectId,
                    data
                );
            }

            reset();
            onClose();
            loadData();
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
                            {task
                                ? "Edit Task"
                                : "Tambah Task"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {task
                                ? "Perbarui informasi task."
                                : "Tambahkan task baru ke dalam project."}
                        </p>
                    </div>

                    <button
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
                            Judul Task
                        </label>

                        <input
                            {...register(
                                "title",
                                {
                                    required:
                                        "Judul wajib diisi",
                                }
                            )}
                            placeholder="Contoh: Implementasi Login API"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />

                        {errors.title && (
                            <p className="mt-2 text-sm text-red-500">
                                {
                                    errors
                                        .title
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
                            placeholder="Tuliskan deskripsi task..."
                            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Menyimpan..."
                                : task
                                ? "Update Task"
                                : "Simpan Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
