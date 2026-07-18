import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createTask, updateTask } from "@/src/services/project";

interface TaskModalProps {
    open: boolean;
    projectId: number;
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

    if (!open) return null;

    const onSubmit = async (data: FormData) => {
        try {
            if (task) {
                await updateTask(task.id, data);
            } else {
                await createTask(projectId, data);
            }
            reset();
            onClose();
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        {task ? "Edit Task" : "Tambah Task"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-md p-2 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Judul
                        </label>

                        <input
                            {...register("title", {
                                required: "Judul wajib diisi",
                            })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            placeholder="Masukkan judul task"
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Deskripsi
                        </label>

                        <textarea
                            rows={4}
                            {...register("description")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            placeholder="Masukkan deskripsi task"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Menyimpan..."
                                : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
