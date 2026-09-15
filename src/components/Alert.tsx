import {
    CheckCircle,
    AlertCircle,
    Info,
    XCircle,
} from "lucide-react";

interface AlertProps {
    type?: "success" | "error" | "warning" | "info";
    message: string;
}

export default function Alert({
    type = "info",
    message,
}: AlertProps) {
    const variants = {
        success: {
            bg: "bg-green-100",
            border: "border-green-500",
            text: "text-green-700",
            icon: <CheckCircle size={20} />,
        },
        error: {
            bg: "bg-red-100",
            border: "border-red-500",
            text: "text-red-700",
            icon: <XCircle size={20} />,
        },
        warning: {
            bg: "bg-yellow-100",
            border: "border-yellow-500",
            text: "text-yellow-700",
            icon: <AlertCircle size={20} />,
        },
        info: {
            bg: "bg-blue-100",
            border: "border-blue-500",
            text: "text-blue-700",
            icon: <Info size={20} />,
        },
    };

    const style = variants[type];

    return (
        <div
            className={`flex items-center gap-3 rounded-lg border-l-4 p-4 ${style.bg} ${style.border} ${style.text}`}
        >
            {style.icon}
            <p className="text-sm font-medium">
                {message}
            </p>
        </div>
    );
}
