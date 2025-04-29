'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ExclamationTriangleIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
  UsersIcon,
} from '@heroicons/react/24/solid';

const navItems = [
  { label: 'Urgências', icon: ExclamationTriangleIcon, href: '/admin/urgencias' },
  { label: 'Processos e Demandas', icon: DocumentMagnifyingGlassIcon, href: '/admin/processos' },
  { label: 'Relatórios', icon: ChartBarIcon, href: '/admin/relatorios' },
  { label: 'Órgãos', icon: BuildingOffice2Icon, href: '/admin/orgaos' },
  { label: 'Comunidade', icon: UsersIcon, href: '/admin/comunidade' },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <div className="w-1/6 bg-gradient-to-b from-purple-300 to-purple-100 shadow-md flex flex-col p-4 gap-5 text-black">
      <h2 className="text-xl font-bold mb-6 text-center">InfraZen</h2>
      <nav className="space-y-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 px-2 py-1 rounded-md ${
                isActive ? 'bg-purple-300 text-purple-900 font-semibold' : 'hover:text-purple-700'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
