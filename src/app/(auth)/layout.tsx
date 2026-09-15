export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {/* Left */}
            <div className="hidden lg:flex bg-linear-to-br from-blue-700 via-blue-600 to-cyan-500 text-white">
                <div className="flex w-full flex-col justify-center px-20">
                    <span className="mb-4 rounded-full bg-white/20 px-4 py-2 w-fit text-sm">
                        Project Management System
                    </span>

                    <h1 className="text-5xl font-bold leading-tight">
                        Kelola Project
                        <br />
                        Lebih Terstruktur.
                    </h1>

                    <p className="mt-8 text-lg text-blue-100">
                        Platform untuk mengelola project, tim,
                        task, progress, hingga laporan
                        dalam satu dashboard modern.
                    </p>

                    <div className="mt-12 space-y-5">
                        <div className="flex items-center gap-3">
                            ✅ Team Collaboration
                        </div>

                        <div className="flex items-center gap-3">
                            ✅ Task Management
                        </div>

                        <div className="flex items-center gap-3">
                            ✅ Progress Tracking
                        </div>

                        <div className="flex items-center gap-3">
                            ✅ Reporting
                        </div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-center bg-slate-50 p-8">
                <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl transition-all duration-300 hover:shadow-2xl">
                    {children}
                    {/* Footer */}
                    <p className="mt-10 text-center text-xs text-gray-400">
                        © 2026 Project Management System
                    </p>
                </div>
            </div>
        </div>
    );
}
