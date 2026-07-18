"use client";

import { useEffect, useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import {
    getProjects,
    getTasks,
} from "@/src/services/project";
import { useSearch } from "@/src/context/SearchContext";

import Button from "@/src/components/Button";
import Loading from "@/src/components/Loading";
import ProjectCard from "@/src/components/ProjectCard";
import TaskCard from "@/src/components/TaskCard";
import TaskModal from "@/src/components/TaskModal";

interface Project {
    id: number;
    name: string;
    description: string | null;
}

type TaskStatus = "todo" | "progress" | "done";

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
}

export default function Project() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [loading, setLoading] = useState(true);
    const [loadingTask, setLoadingTask] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState<TaskStatus | "all">("all");
    const { search } = useSearch();

    useEffect(()=>{
        fetchData();
    },[]);

    const loadData = async () => {
        if (!selectedProject) return;
        await loadTasks(selectedProject);
    };

    const fetchData = async () => {
        try {
            const response = await getProjects();
            setProjects(response.data);
            if (response.data.length > 0) {
                await loadTasks(response.data[0]);
            }
        } finally {
            setLoading(false);
        }
    };

    const loadTasks = async(project: Project) => {
        setLoadingTask(true);
        try{
            const response = await getTasks(project.id);
            setSelectedProject(project);
            setTasks(response.data);
        } finally{
            setLoadingTask(false);
        }
    }

    const filteredProjects = projects.filter((project) => {
        if (!search) return true;

        const keyword = search.toLowerCase();

        return (
            project.name
                .toLowerCase()
                .includes(keyword) ||
            (project.description ?? "")
                .toLowerCase()
                .includes(keyword)
        );
    });

    const filters: Record<TaskStatus | "all", string> = {
        all: "All",
        todo: "Todo",
        progress: "Progress",
        done: "Done",
    };

    const filteredTasks = tasks.filter((task) => {
        const statusMatch =
            filter === "all"
                ? true
                : task.status === filter;

        const keyword = search.toLowerCase();

        const searchMatch =
            !search ||
            task.title
                .toLowerCase()
                .includes(keyword) ||
            (task.description ?? "")
                .toLowerCase()
                .includes(keyword);

        return statusMatch && searchMatch;
    });

    if(loading){
        return <Loading/>
    }

    return(
        <>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        My Projects
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Kelola seluruh project yang sedang berjalan.
                    </p>
                </div>

                <Button
                    // onClick={() => setOpenModal(true)}
                    className="h-11 flex-none px-5 py-2"
                >
                    <Plus size={18} />
                    Tambah Projek
                </Button>
            </div>

            {
                projects.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    name={project.name}
                                    description={project.description}
                                    active={selectedProject?.id === project.id}
                                    onClick={() => loadTasks(project)}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed bg-white py-16 text-center">
                        <h2 className="text-xl font-semibold">
                            Belum Ada Project
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Silakan buat project terlebih dahulu.
                        </p>
                    </div>
                )
            }

            {
                selectedProject && (
                    <>
                        <div className="mb-8 mt-10 flex flex-col justify-between gap-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 p-8 text-white md:flex-row md:items-center">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <FolderKanban
                                        size={24}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-slate-200">
                                        {selectedProject.name}
                                    </h2>

                                    <p className="mt-1 max-w-2xl text-slate-300">
                                        {selectedProject.description}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={() => setOpenModal(true)}
                                className="h-11 flex-none px-5 py-2"
                            >
                                <Plus size={18} />
                                Tambah Task
                            </Button>
                        </div>

                        {/* Filter */}
                        <div className="mb-6 flex flex-wrap gap-3">
                            {Object.entries(filters).map(([key, label]) => {
                                const total =
                                    key === "all"
                                        ? tasks.length
                                        : tasks.filter(
                                            (task) =>
                                                task.status === key
                                        ).length;

                                return (
                                    <button
                                        key={key}
                                        onClick={() =>
                                            setFilter(
                                                key as TaskStatus | "all"
                                            )
                                        }
                                        className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                                            filter === key
                                                ? "border-blue-600 bg-blue-600 text-white"
                                                : "border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                                        }`}
                                    >
                                        {label}
                                        <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                                            {total}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* List Task */}
                        <div className="space-y-4">
                            {loadingTask ? (
                                <Loading text="Memuat daftar task..." />
                            ) : filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        loadData={loadData}
                                        onEdit={(task: Task) => {
                                            setSelectedTask(task);
                                            setOpenModal(true);
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                                        📋
                                    </div>

                                    <h2 className="text-xl font-semibold text-slate-700">
                                        Belum Ada Task
                                    </h2>

                                    <p className="mt-2 text-slate-500">
                                        Tambahkan task pertama untuk project ini.
                                    </p>

                                    <div className="mt-6 flex justify-center">
                                        <Button
                                            onClick={() =>
                                                setOpenModal(true)
                                            }
                                            className="w-auto px-6"
                                        >
                                            <Plus size={18} />
                                            Tambah Task
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal */}
                        <TaskModal
                            open={openModal}
                            projectId={selectedProject.id}
                            task={selectedTask}
                            onClose={() => {
                                setOpenModal(false);
                                setSelectedTask(null);
                            }}
                            loadData={() =>
                                loadTasks(selectedProject)
                            }
                        />
                    </>
                )
            }
        </>
    )
}
