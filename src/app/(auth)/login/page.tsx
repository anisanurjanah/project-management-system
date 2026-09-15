"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/src/services/auth";

import Link from "next/link";

import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

export default function LoginPage() {

    return (
        <>
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-slate-800">
                    Welcome Back 👋
                </h1>

                <p className="mt-2 text-slate-500">
                    Login untuk melanjutkan ke Aplikasi.
                </p>
            </div>

            <form
                className="space-y-5"
            >
                <Input
                    label="Email"
                    type="email"
                />

                <Input
                    label="Password"
                    type="password"
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    Login
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
                Belum punya akun?

                <Link
                    href="/register"
                    className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
                >
                    Daftar sekarang
                </Link>
            </p>
        </>
    );
}
