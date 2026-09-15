import api from "@/src/lib/api";

export const register = async(data:any)=>{
    const response = await api.post("/register",data);
    return response.data;
}
