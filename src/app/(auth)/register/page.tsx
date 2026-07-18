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
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        mode: "onChange",
    });

    const password = watch("password");
    const onSubmit = async (data: any) => {
        setAlert({
            show: false,
            type: "success",
            message: "",
        });

        try {
            await registerAPI(data);
            setAlert({
                show: true,
                type: "success",
                message: "Register berhasil.",
            });
            setTimeout(() => {
                router.push("/login");
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
                    label="Nama"
                    {...register("name", {
                        required: "Nama wajib diisi",
                        minLength: {
                            value: 3,
                            message: "Nama minimal 3 karakter",
                        },
                        maxLength: {
                            value: 100,
                            message: "Nama maksimal 100 karakter",
                        },
                        setValueAs: (value) => value.trim(),
                    })}
                    error={errors.name?.message as string}
                />

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

                <Input
                    label="Konfirmasi Password"
                    type="password"
                    {...register("password_confirmation", {
                        required: "Konfirmasi password wajib diisi",
                        validate: (value) =>
                            value === password ||
                            "Konfirmasi password tidak sama",
                    })}
                    error={errors.password_confirmation?.message as string}
                />

                <Button
                    type="submit"
                    className="w-full"
                    loading={isSubmitting}
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
