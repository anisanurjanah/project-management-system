import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="mt-5 text-center">
          Sudah punya akun?
          <Link
              href="/auth/login"
              className="ml-2 text-blue-600"
          >
              Login
          </Link>
      </p>
    </div>
  );
}
