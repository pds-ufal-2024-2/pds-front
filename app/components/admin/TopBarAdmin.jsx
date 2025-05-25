"use client";
// import { BellIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
// import api from '@/services/api';
// import { useRouter } from "next/navigation";
// import Cookies from 'js-cookie';
import { ArrowRightEndOnRectangleIcon, BellIcon } from '@heroicons/react/24/solid';
import { Button } from '@heroui/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from "next/navigation";

import logo from '../../../public/zen-logo.svg';

import api from '@/services/api';

export default function TopbarAdmin() {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout");
  try {
    await api.post("/logout");
    document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/";
    document.cookie = "laravel_session=; Max-Age=0; path=/";
    Cookies.remove('token');

    router.push("/admin/login");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

  return (
    // <header className="flex items-center justify-end bg-gradient-to-b from-purple-300 to-purple-200 p-4">
    //   <button onClick={handleLogout} className="relative flex items-center justify-center gap-4">
    //     <BellIcon className="w-6 h-6 text-black" />
    //     <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-black hover:text-red-600" />
    //   </button>
    // </header>
    <header className="h-[80px] flex items-center justify-between border-b p-4">
      <div className="flex gap-4">
        <Image alt='Logo InfraZen' height={32} src={logo} />
        <h2 className='text-2xl font-bold text-primary'>InfraZen</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button isIconOnly color='primary' variant='light'>
          <BellIcon className="w-6 h-6" />
        </Button>
        <Button isIconOnly color='primary' variant='light'>
          <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
