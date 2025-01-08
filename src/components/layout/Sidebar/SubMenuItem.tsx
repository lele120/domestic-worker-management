'use client'

import React from 'react'

interface SubMenuItemProps {
  href: string
  text: string
  active: boolean
  onClick: () => void
}

const SubMenuItem = ({ text, active, onClick }: SubMenuItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-2 text-sm rounded-lg mb-1 hover:bg-blue-50 pl-12
      ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
  >
    <span>{text}</span>
  </button>
)

export default SubMenuItem