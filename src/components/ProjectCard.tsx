interface ProjectCardProps {
    id: number;
    name: string;
    description: string;
    active?: boolean;
    onClick?: () => void;
}

export default function ProjectCard({
    name,
    description,
    active = false,
    onClick,
}: ProjectCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                w-full rounded-2xl border p-5 text-left transition-all duration-200
                ${
                    active
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                }
            `}
        >
            <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">
                {name}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                {description || "Tidak ada deskripsi project."}
            </p>
        </button>
    );
}
