import api from "@/src/lib/api";

export const getProjects = async()=>{
    const response = await api.get(`/projects`);
    return response.data;
}

export const getProject = async(id:number)=>{
    const response = await api.get(`/projects/${id}`);
    return response.data;
}

export const getTasks = async(id:number)=>{
    const response = await api.get(`/projects/${id}/tasks`);
    return response.data;
}

export const createTask = async (
    projectId: number,
    data: {
        title: string;
        description: string;
    }
) => {
    const response = await api.post(
        `/projects/${projectId}/tasks`,
        data
    );

    return response.data;
};

export const updateTask = async (
    id: number,
    data: {
        title: string;
        description: string;
    }
) => {
    const response = await api.put(
        `/tasks/${id}`,
        data
    );

    return response.data;
};

export const deleteTask = async (id: number) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

export const updateTaskStatus = async (
    id: number,
    status: string
) => {
    const response = await api.patch(
        `/tasks/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};
