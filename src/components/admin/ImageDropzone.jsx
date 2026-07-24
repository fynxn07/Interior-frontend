import { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaTimes, FaImage } from "react-icons/fa";

function ImageDropzone({
  label,
  value,
  onChange,
  onRemove,
  aspect = "aspect-video",
  lightBacking = false,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  // value can be:
  //  - a File (a brand-new upload the admin just picked)
  //  - a string (an existing Cloudinary URL, when editing something already saved)
  //  - null/undefined (nothing selected yet)
  const previewUrl = useMemo(() => {
    if (!value) return null;
    if (value instanceof File) return URL.createObjectURL(value);
    return value;
  }, [value]);

  // Object URLs are held in browser memory until explicitly released —
  // revoke the old one whenever it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (value instanceof File && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, value]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      {label && (
        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative ${aspect} w-full rounded-xl border-2 border-dashed overflow-hidden cursor-pointer transition-all duration-300 ${
          dragOver
            ? "border-[#8B7CFF] bg-[#8B7CFF]/10"
            : previewUrl
            ? "border-white/10"
            : "border-white/15 hover:border-[#8B7CFF]/50 bg-white/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
          className="hidden"
        />

        {previewUrl ? (
          <>
            <div
              className={`w-full h-full flex items-center justify-center ${
                lightBacking ? "bg-gradient-to-br from-[#fdfcfa] to-[#efe8db] p-6" : ""
              }`}
            >
              <img
                src={previewUrl}
                alt=""
                className={
                  lightBacking
                    ? "max-w-full max-h-full object-contain"
                    : "w-full h-full object-cover"
                }
              />
            </div>
            <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <span className="text-white text-xs font-medium">
                Click to replace
              </span>
            </div>
            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                aria-label="Remove image"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <FaTimes size={11} />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
            <motion.div
              animate={{ y: dragOver ? -4 : 0 }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#8B7CFF]"
            >
              {dragOver ? <FaCloudUploadAlt size={16} /> : <FaImage size={14} />}
            </motion.div>
            <p className="text-xs text-center px-4">
              {dragOver ? "Drop image here" : "Click or drag image to upload"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageDropzone;