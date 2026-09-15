"use client";

import { useForm} from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerAPI } from "@/src/services/auth";

import Link from "next/link";

import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

export default function RegisterPage(){

    return(
        <>
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-slate-800">
                    Create Account
                </h1>

                <p className="mt-2 text-slate-500">
                    Buat akun baru dan mulai mengelola project Anda.
                </p>
            </div>

            <form
                className="space-y-5"
            >
                <Input
                    label="Nama"
                />

                <Input
                    label="Email"
                />

                <Input
                    label="Password"
                    type="password"
                />

                <Input
                    label="Konfirmasi Password"
                    type="password"
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    Register
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">
                        atau
                    </span>
                </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
                Sudah memiliki akun?

                <Link
                    href="/login"
                    className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
                >
                    Login
                </Link>
            </p>
        </>
    )
}
