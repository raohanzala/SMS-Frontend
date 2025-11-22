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
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        <div className="w-32 h-32 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {value ? (
            typeof value === "string" ? (
              <img
                src={value}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src={URL.createObjectURL(value)}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            )
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedFile(file);
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen && !!imageSrc}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
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

        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full mt-4"
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Done</Button>
        </div>
      </Modal>

      {/* Modal */}
      {/* {isModalOpen && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[90%] max-w-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-4">Crop Image</h3>

            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full mt-4"
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Done</Button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ImageCropperInput;
