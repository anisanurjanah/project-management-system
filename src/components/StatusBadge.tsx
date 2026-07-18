type Status = 'todo' | 'progress' | 'done';

interface Props {
    status: Status;
    onClick?: () => void;
}

export default function StatusBadge({
    status,
    onClick,
}: Props) {
    const color: Record<Status, string> = {
        todo: "bg-gray-200 text-gray-700",
        progress: "bg-yellow-200 text-yellow-700",
        done: "bg-green-200 text-green-700",
    };

    return(
        <span
            onClick={onClick}
            className={`cursor-pointer rounded-full px-3 py-1 text-sm ${color[status]}`}
        >
            {status}
        </span>
    )
}
