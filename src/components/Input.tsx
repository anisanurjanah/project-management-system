"use client";

import React, {
    forwardRef,
    useId,
} from "react";

import { AlertCircle } from "lucide-react";

interface Props
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            error,
            required,
            className = "",
            ...props
        },
        ref
    ) => {
        const id = useId();

        return (
            <div className="space-y-2">
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-slate-700"
                >
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    )}
                </label>

                <input
                    id={id}
                    ref={ref}
                    {...props}
                    className={`
                        w-full rounded-xl border bg-white
                        px-4 py-3
                        text-sm text-slate-800
                        placeholder:text-slate-400
                        outline-none
                        transition-all duration-200

                        ${
                            error
                                ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }

                        disabled:cursor-not-allowed
                        disabled:bg-slate-100
                        disabled:text-slate-400

                        ${className}
                    `}
                />

                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-500">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
