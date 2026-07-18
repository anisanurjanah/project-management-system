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
                router.push("/auth/login");
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
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">
                    Register
                </h1>
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
                    loading={isSubmitting}
                >
                    Register
                </Button>
            </form>

            <p className="mt-5 text-center">
                Sudah punya akun?
                <Link
                    href="/auth/login"
                    className="ml-2 text-blue-600"
                >
                    Login
                </Link>
            </p>
        </>
    )
}
