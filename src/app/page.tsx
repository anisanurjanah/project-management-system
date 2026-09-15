import Link from "next/link";
import {
    FolderKanban,
    Users,
    ChartSpline,
    FileText,
    ArrowRight,
} from "lucide-react";

const features = [
    {
        icon: FolderKanban,
        title: "Project Management",
        description: "Kelola seluruh project dalam satu dashboard yang terintegrasi.",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Buat tim, tetapkan anggota, dan bekerja secara kolaboratif.",
    },
    {
        icon: ChartSpline,
        title: "Progress Tracking",
        description: "Pantau perkembangan project secara realtime.",
    },
    {
        icon: FileText,
        title: "Reporting",
        description: "Lihat laporan aktivitas dan histori project kapan saja.",
    },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navbar */}
            <header className="border-b bg-white/70 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <h1 className="text-xl font-bold text-slate-800">
                        Project Management System
                    </h1>

                    <Link
                        href="/login"
                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Login
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
                <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                    Project Management System
                </span>

                <h1 className="mt-6 max-w-3xl text-5xl font-extrabold tracking-tight text-slate-900">
                    Kelola Project Lebih Cepat,
                    <span className="text-blue-600"> Lebih Terstruktur</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                    Platform untuk mengelola project, tim, progres pekerjaan,
                    hingga laporan dalam satu dashboard yang modern dan mudah
                    digunakan.
                </p>

                <div className="mt-10 flex gap-4">
                    <Link
                        href="/login"
                        className="flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Mulai Sekarang
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>

                    <Link
                        href="/login"
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Login
                    </Link>
                </div>
            </section>

            {/* Stats */}
            <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
                {[
                    ["120+", "Project"],
                    ["35", "Team"],
                    ["98%", "Success Rate"],
                ].map(([value, label]) => (
                    <div
                        key={label}
                        className="rounded-2xl bg-white p-8 text-center shadow-sm"
                    >
                        <h2 className="text-4xl font-bold text-blue-600">
                            {value}
                        </h2>

                        <p className="mt-2 text-slate-600">{label}</p>
                    </div>
                ))}
            </section>

            {/* Features */}
            <section className="mx-auto max-w-7xl px-6 py-24">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold">
                        Semua yang Dibutuhkan Tim Anda
                    </h2>

                    <p className="mt-3 text-slate-600">
                        Dirancang untuk membantu setiap tim bekerja lebih
                        produktif.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <feature.icon className="mb-5 h-10 w-10 text-blue-600" />

                            <h3 className="mb-2 text-lg font-semibold">
                                {feature.title}
                            </h3>

                            <p className="text-sm leading-6 text-slate-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-900 py-20">
                <div className="mx-auto max-w-3xl text-center text-white">
                    <h2 className="text-4xl font-bold">
                        Siap Mengelola Project Anda?
                    </h2>

                    <p className="mt-5 text-slate-300">
                        Masuk ke sistem dan mulai mengelola seluruh aktivitas
                        project secara terpusat.
                    </p>

                    <Link
                        href="/login"
                        className="mt-10 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
                    >
                        Login Sekarang
                    </Link>
                </div>
            </section>
        </main>
    );
}
