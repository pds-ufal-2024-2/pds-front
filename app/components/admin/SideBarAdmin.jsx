'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import Image from 'next/image';
// import logo from '../../../public/logoInfraZen.png';
// import {
//   ExclamationTriangleIcon,
//   ChartBarIcon,
//   BuildingOffice2Icon,
// } from '@heroicons/react/24/solid';
import {
  BuildingOffice2Icon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SidebarItem from './SidebarItem';
import SidebarToggle from './SidebarToggle';

const navItems = [
  { label: 'Processos e demandas', icon: ExclamationTriangleIcon, href: '/admin/urgencias' },
  // { label: 'Urgências', icon: ExclamationTriangleIcon, href: '/admin/urgencias' },
  // { label: 'Processos e Demandas', icon: DocumentMagnifyingGlassIcon, href: '/admin/processos' },
  { label: 'Relatórios', icon: ChartBarIcon, href: '/admin/relatorios' },
  { label: 'Órgãos', icon: BuildingOffice2Icon, href: '/admin/orgaos' },
];

export default function SidebarAdmin() {
  // const pathname = usePathname();

  const router = useRouter();
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <nav
      className="h-screen border-r flex flex-col justify-between items-center bg-background"
      style={{
        width: `${open ? "260px" : "80px"}`,
        transition: "all 0.3s ease",
      }}
    >
      <SidebarToggle open={open} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col items-center w-full grow p-4 gap-4">
        {navItems.map((route, index) => (
          <SidebarItem
            key={index}
            collapse={!open}
            {...route}
            onClick={() => router.push(route.href)}
          />
        ))}
      </div>
    </nav>
  );
}
