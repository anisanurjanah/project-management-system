"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/src/services/project";

import ProjectCard from "@/src/components/ProjectCard";
import Loading from "@/src/components/Loading";

export default function Dashboard() {
    const [projects,setProjects] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const projects = await getProjects();
            setProjects(projects.data);
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return <Loading/>
    }

    return(
        <>
            <div className="mt-8">
                <h2 className="mb-5 text-xl font-bold">
                    My Project
                </h2>

                {
                    projects.length > 0 ? (
                        <div className="grid grid-cols-2 gap-5">
                            {
                                projects.map((project: any) => (
                                    <ProjectCard
                                        key={project.id}
                                        id={project.id}
                                        name={project.name}
                                        description={project.description}
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
            </div>
        </>
    )
}
