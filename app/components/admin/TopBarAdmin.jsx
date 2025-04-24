import React from 'react'
import { BellIcon } from '@heroicons/react/24/solid'

export default function TopbarAdmin() {
  return (
    <header className="flex items-center justify-end bg-gradient-to-b from-purple-300 to-purple-100 p-4">
      <button className="relative">
        <BellIcon className="w-6 h-6 text-black" />
      </button>
    </header>
  )
}
