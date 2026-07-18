import React, { forwardRef } from "react";

interface Props
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-black">
                    {label}
                </label>

                <input
                    ref={ref}
                    {...props}
                    className={`w-full rounded-lg border px-4 py-2 text-black outline-none ${
                        error
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    }`}
                />

                {error && (
                    <small className="text-red-500">
                        {error}
                    </small>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;