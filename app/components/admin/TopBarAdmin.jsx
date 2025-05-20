"use client";
import { BellIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import api from '@/services/api';
import { useRouter } from "next/navigation";

export default function TopbarAdmin() {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout");
  try {
    await api.post("/logout");
    document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/";
    document.cookie = "laravel_session=; Max-Age=0; path=/";

    router.push("/admin/login");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

  return (
    <header className="flex items-center justify-end bg-gradient-to-b from-purple-300 to-purple-200 p-4">
      <button onClick={handleLogout} className="relative flex items-center justify-center gap-4">
        <BellIcon className="w-6 h-6 text-black" />
        <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-black hover:text-red-600" />
      </button>
    </header>
  );
}
