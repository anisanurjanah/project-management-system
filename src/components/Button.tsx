interface Props{
    children:React.ReactNode
    loading?:boolean
    type?:"submit"|"button"
}

export default function Button({
    children,
    loading,
    type="button"
}:Props){
    return(
        <button
            type={type}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
            {
                loading ? "Loading..." : children
            }
        </button>
    )
}
