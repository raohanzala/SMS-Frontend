import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import Button from "@/components/common/Button";
import Modal from "./Modal";

interface ImageCropperInputProps {
  value?: File | string | null;
  onChange: (file: File) => void;
  label?: string;
  aspect?: number;
}

const ImageCropperInput: React.FC<ImageCropperInputProps> = ({
  value,
  onChange,
  label = "Profile Image",
  aspect = 1,
}) => {
  console.log(value)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load image into cropper when file selected
  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(selectedFile);
    setIsModalOpen(true);
  }, [selectedFile]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
    onChange(croppedFile);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="flex items-center gap-4">
        {/* Profile Preview */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center relative group hover:ring-2 hover:ring-primary transition">
          {value ? (
            typeof value === "string" ? (
              <img src={value} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <img
                src={URL.createObjectURL(value)}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            )
          ) : (
            <span className="text-gray-400 text-sm">No image</span>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-medium transition cursor-pointer rounded-full">
            Change
          </div>
        </div>

        {/* Upload Button */}
        <input
          type="file"
          accept="image/*"
          className="cursor-pointer px-4 py-2 border rounded-lg bg-white shadow hover:bg-gray-50 transition"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedFile(file);
          }}
        />
      </div>

      {/* Crop Modal */}
      <Modal
        isOpen={isModalOpen && !!imageSrc}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Crop Image</h3>

          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200">
            <Cropper
              image={imageSrc || ""}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Zoom Slider */}
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full mt-4 accent-primary"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Done</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageCropperInput;
