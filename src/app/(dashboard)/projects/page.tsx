"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";

import { getProject, getTasks } from "@/src/services/project";
import Loading from "@/src/components/Loading";
import TaskCard from "@/src/components/TaskCard";
import TaskModal from "@/src/components/TaskModal";

interface Project {
    id: number;
    name: string;
    description: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

export default function ProjectPage(){
    const {id}=useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [loading,setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState("all");
    
    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    const filters = [
        "all",
        "todo",
        "progress",
        "done",
    ];

    const filteredTasks =
    filter === "all"
        ? tasks
        : tasks.filter(
              (task: any) =>
                  task.status === filter
          );

    const loadData = async () => {
        try {
            console.log("id:", id);

            const [project, task] = await Promise.all([
                getProject(Number(id)),
                getTasks(Number(id)),
            ]);

            console.log(project);
            console.log(task);

            setProject(project.data);
            setTasks(task.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !project) {
        return <Loading />;
    }

    return(
        <>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1
                        className="text-3xl font-bold"
                    >
                        {project.name}
                    </h1>
                    <p
                        className="mt-2 text-gray-500"
                    >
                        {project.description}
                    </p>
                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                >
                    Tambah Task
                </button>
            </div>

            <div className="mb-5 flex gap-3">
                {
                    filters.map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`rounded-lg px-4 py-2 ${
                                filter === item
                                    ? "bg-blue-600 text-white"
                                    : "border"
                            }`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))
                }
            </div>

            <div className="space-y-4">
                {
                    filteredTasks.length > 0 ? (
                        filteredTasks.map((task: any) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                loadData={loadData}
                                onEdit={(task) => {
                                    setSelectedTask(task);
                                    setOpenModal(true);
                                }}
                            />
                        ))
                    ) : (
                        <div className="rounded-xl border border-dashed bg-white py-16 text-center">
                            <h2 className="text-xl font-semibold">
                                Belum Ada Task
                            </h2>
                            <p className="mt-2 text-gray-500">
                                Klik tombol Tambah Task
                            </p>
                        </div>
                    )
                }
            </div>

            <TaskModal
                open={openModal}
                projectId={project.id}
                task={selectedTask}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedTask(null);
                }}
                loadData={loadData}
            />
        </>
    )
}
