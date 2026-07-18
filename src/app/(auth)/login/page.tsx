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
    const router = useRouter();
    const [alert, setAlert] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
    }>({
        show: false,
        type: "success",
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data: any) => {
        setAlert({
            show: false,
            type: "success",
            message: "",
        });

        try {
            const response = await login(data);
            localStorage.setItem("token", response.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );
            setAlert({
                show: true,
                type: "success",
                message: "Login berhasil.",
            });
            setTimeout(() => {
                router.push("/projects");
            }, 1000);
        } catch (error: any) {
            setAlert({
                show: true,
                type: "error",
                message:
                    error.response?.data?.message ??
                    "Terjadi kesalahan.",
            });
        }
    };

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

            {
                alert.show && (
                    <div className="mb-5">
                        <Alert
                            type={alert.type}
                            message={alert.message}
                        />
                    </div>
                )
            }

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <Input
                    label="Email"
                    type="email"
                    {...register("email", {
                        required: "Email wajib diisi",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Format email tidak valid",
                        },
                        setValueAs: (value) => value.trim(),
                    })}
                    error={errors.email?.message as string}
                />

                <Input
                    label="Password"
                    type="password"
                    {...register("password", {
                        required: "Password wajib diisi",
                        minLength: {
                            value: 6,
                            message: "Password minimal 6 karakter",
                        },
                        maxLength: {
                            value: 50,
                            message: "Password maksimal 50 karakter",
                        },
                    })}
                    error={errors.password?.message as string}
                />

                <Button
                    type="submit"
                    className="w-full"
                    loading={isSubmitting}
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
