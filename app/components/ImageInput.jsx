'use client';
import React, { useState } from "react";
import { Input, Image } from "@heroui/react";

const ImageInput = ({
  label,
  name,
  onChange,
  isRequired = false,
  placeholder = "Select an image",
  className = "",
}) => {
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result);
        if (onChange) {
          onChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={`flex flex-col gap-2 ${className}`}>
        <Input
          accept="image/*"
          classNames={{
            input: "cursor-pointer",
          }}
          isRequired={isRequired}
          name={name}
          placeholder={placeholder}
          type="file"
          onChange={handleImageChange}
        />
        {/* {preview && (
          <div className="mt-2">
            <Image
              alt="Preview"
              className="object-cover"
              height={200}
              radius="md"
              src={preview}
              width={200}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ImageInput;