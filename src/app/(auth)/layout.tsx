export default function AuthLayout({
    children,
}:{
    children:React.ReactNode
}){
    return(
        <main
            className="flex min-h-screen items-center justify-center bg-slate-100"
        >
            <div
                className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
            >
                {children}
            </div>
        </main>
    )
}
