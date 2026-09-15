"use client";

import { useEffect, useState } from "react";
import { Plus, FolderKanban } from "lucide-react";

import Button from "@/src/components/Button";
import Loading from "@/src/components/Loading";

interface Project {
    id: number;
    name: string;
    description: string | null;
}

type TaskStatus = "todo" | "progress" | "done";

interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export default function Project() {

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
                    className="h-11 flex-none px-5 py-2"
                >
                    <Plus size={18} />
                    Tambah Projek
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4"></div>
        
            <div className="rounded-xl border border-dashed bg-white py-16 text-center">
                <h2 className="text-xl font-semibold">
                    Belum Ada Project
                </h2>

                <p className="mt-2 text-gray-500">
                    Silakan buat project terlebih dahulu.
                </p>
            </div>

            <div className="mb-8 mt-10 flex flex-col justify-between gap-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 p-8 text-white md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                        <FolderKanban
                            size={24}
                            className="text-blue-600"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-200"></h2>

                        <p className="mt-1 max-w-2xl text-slate-300"></p>
                    </div>
                </div>

                <Button
                    className="h-11 flex-none px-5 py-2"
                >
                    <Plus size={18} />
                    Tambah Task
                </Button>
            </div>

            {/* Filter */}
            <div className="mb-6 flex flex-wrap gap-3"></div>

            {/* List Task */}
            <div className="space-y-4">
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
                            className="w-auto px-6"
                        >
                            <Plus size={18} />
                            Tambah Task
                        </Button>
                    </div>
                </div>
            </div>

            {/* Task Modal */}
            <TaskModal/>

            {/* Project Modal */}
            <ProjectModal/>
        </>
    )
}
