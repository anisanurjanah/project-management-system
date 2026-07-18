import api from "@/src/lib/api";

export const register = async(data:any)=>{
    const response = await api.post("/register",data);
    return response.data;
}

export const login = async(data:any)=>{
    const response = await api.post("/login",data);
    return response.data;
}

export const logout = async()=>{
    const response = await api.post("/logout");
    return response.data;
}

export const profile = async()=>{
    const response = await api.get("/profile");
    return response.data;
}
