import { useState } from "react";
import { deleteTask, updateTaskStatus } from "@/src/services/project";

import StatusBadge from "./StatusBadge"

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

    const handleDelete = async () => {
        const confirmMessage = confirm(
            "Yakin ingin menghapus task ini?"
        );

        if (!confirmMessage) return;

        try {
            await deleteTask(task.id);
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeStatus = async (status: string) => {
        try {
            await updateTaskStatus(
                task.id,
                status
            );
            setOpenStatus(false);
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div
            className="rounded-xl bg-white p-5 shadow"
        >
            <div
                className="flex justify-between"
            >
                <h2
                    className="font-semibold"
                >
                    {task.title}
                </h2>
                <div className="relative">
                    <StatusBadge
                        status={task.status}
                        onClick={() =>
                            setOpenStatus(!openStatus)
                        }
                    />

                    {
                        openStatus && (
                            <div className="absolute right-0 mt-2 w-36 rounded-lg border bg-white shadow-lg">
                                <button
                                    onClick={() =>
                                        handleChangeStatus("todo")
                                    }
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                >
                                    Todo
                                </button>

                                <button
                                    onClick={() =>
                                        handleChangeStatus("progress")
                                    }
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                >
                                    Progress
                                </button>

                                <button
                                    onClick={() =>
                                        handleChangeStatus("done")
                                    }
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                >
                                    Done
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

            <p
                className="mt-3 text-gray-500"
            >
                {task.description}
            </p>

            <div
                className="flex gap-2"
            >
                <button
                    onClick={() => onEdit(task)}
                    className="rounded bg-blue-600 px-3 py-1 text-white"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="text-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
