"use client";

import { profile } from "@/src/services/auth";
import { useEffect, useState } from "react";

import Loading from "@/src/components/Loading";

export default function Profile() {
    const [user,setUser]=useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        loadProfile();
    },[]);

    const loadProfile = async()=>{
        try {
            const response = await profile();
            setUser(response.data);
        } finally{
            setLoading(false);
        }
    }

    if(!user){
        return <Loading/>
    }

    return (
        <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow">
            <div className="flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
                    {user?.name.charAt(0)}
                </div>

                <h2 className="mt-5 text-2xl font-bold">
                    {user?.name}
                </h2>

                <p className="text-gray-500">
                    {user?.email}
                </p>
            </div>
        </div>
    );
}
