'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  name: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  error?: string;
  required?: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onRemove,
  error,
  required = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(e);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex items-center">
        <div
          onClick={handleClick}
          className={`relative h-32 w-32 flex items-center justify-center rounded-lg border-2 border-dashed ${
            error ? 'border-red-300' : 'border-gray-300'
          } hover:border-gray-400 cursor-pointer`}
        >
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm text-gray-500">Click to upload</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            name={name}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUploadField; 