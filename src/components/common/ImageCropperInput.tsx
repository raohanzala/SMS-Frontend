import React, { useState, useCallback, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import Button from "@/components/common/Button";
import Modal from "./Modal";
import { Upload, X, ZoomOut } from "lucide-react";

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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load image into cropper when file selected
  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(selectedFile);
    setIsModalOpen(true);
  }, [selectedFile]);

  const onCropComplete = useCallback(
    (_: unknown, croppedPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsLoading(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      onChange(croppedFile);
      setIsModalOpen(false);
      setSelectedFile(null);
      setImageSrc(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onChange(null as unknown as File);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const getImageUrl = () => {
    if (!value) return null;
    if (typeof value === "string") return value;
    return URL.createObjectURL(value);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-text-primary">{label}</label>
      )}

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Profile Preview */}
        <div className="relative group">
          <div className="w-40 h-40 rounded-2xl overflow-hidden bg-bg-secondary border-2 border-border flex items-center justify-center relative shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50">
            {getImageUrl() ? (
              <img
                src={getImageUrl() || ""}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-text-tertiary">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">No image</span>
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-text-white text-sm font-medium transition-all duration-300 cursor-pointer rounded-2xl">
              <Upload className="w-4 h-4" />
              <span>Change</span>
            </div>
          </div>

          {/* Remove button */}
          {getImageUrl() && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-status-error text-text-white flex items-center justify-center shadow-lg hover:bg-status-errorDark transition-colors z-10"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1 w-full sm:w-auto">
          <label className="cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center sm:items-start gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto"
              >
                <Upload className="w-4 h-4 mr-2" />
                {getImageUrl() ? "Change Image" : "Upload Image"}
              </Button>
              <p className="text-xs text-text-tertiary text-center sm:text-left">
                JPG, PNG or GIF. Max size 5MB
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Crop Modal */}
      <Modal
        isOpen={isModalOpen && !!imageSrc}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFile(null);
          setImageSrc(null);
          setZoom(1);
          setCrop({ x: 0, y: 0 });
        }}
        title="Crop Image"
        size="md"
      >
        <div className="space-y-6">
          {/* Crop Area */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden bg-bg-secondary border border-border">
            <Cropper
              image={imageSrc || ""}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="round"
            />
          </div>

          {/* Zoom Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <ZoomOut className="w-4 h-4" />
                <span>Zoom</span>
              </div>
              <span className="font-medium text-text-primary">{zoom.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, #1E59FF 0%, #1E59FF ${((zoom - 1) / 2) * 100}%, #E5E7EB ${((zoom - 1) / 2) * 100}%, #E5E7EB 100%)`,
              }}
            />
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <span>1x</span>
              <span>3x</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
                setImageSrc(null);
                setZoom(1);
                setCrop({ x: 0, y: 0 });
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} loading={isLoading} disabled={isLoading}>
              Save Image
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageCropperInput;
