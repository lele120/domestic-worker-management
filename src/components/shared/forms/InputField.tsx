'use client'

import React from 'react'

interface InputFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  error?: string
  placeholder?: string
  min?: string
  max?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  required = true,
  value,
  onChange,
  error, 
  placeholder
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full rounded-md shadow-sm ${
        error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } sm:text-sm`}
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

export default InputField