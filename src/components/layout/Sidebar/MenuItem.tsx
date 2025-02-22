'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface MenuItemProps {
  href: string
  icon: LucideIcon
  text: string
  active: boolean
  onClick: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MenuItem = ({ href, icon: Icon, text, active, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-2 text-sm rounded-lg mb-1 hover:bg-blue-50 
      ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span>{text}</span>
  </button>
)

export default MenuItem