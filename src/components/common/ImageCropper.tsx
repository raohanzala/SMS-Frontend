import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import Button from "@/components/common/Button";

interface ImageCropperProps {
  onImageCropped: (file: File) => void;
  aspect?: number; // default 1 for square
  initialImage?: string;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  onImageCropped,
  aspect = 1,
  initialImage,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(initialImage || null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageSrc(reader.result as string));
    reader.readAsDataURL(file);
  };

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
    onImageCropped(croppedFile);
    setImageSrc(null); // close cropper after saving
  };

  return (
    <div className="w-full">
      {!imageSrc ? (
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded-md" />
      ) : (
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />

          {/* Zoom Slider */}
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full mt-2"
          />

          {/* Save Button */}
          <div className="mt-2 flex justify-end">
            <Button onClick={handleCropSave}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
