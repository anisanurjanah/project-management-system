import Link from "next/link";

interface Props {
    id: number;
    name: string;
    description: string;
}

export default function ProjectCard({
    id,
    name,
    description,
}: Props) {

    return (
        <Link
            href={`/projects/${id}`}
        >
            <div className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">
                <h2 className="text-xl font-semibold">
                    {name}
                </h2>

                <p className="mt-3 text-gray-500">
                    {description}
                </p>
            </div>
        </Link>
    );
}
