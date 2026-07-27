import { useRef, useState, useEffect } from "react";
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
  //
  // previewUrl is now derived via state + effect (NOT useMemo). This matters:
  // URL.createObjectURL is created fresh *inside* the effect every time it
  // runs, so React 18 StrictMode's dev-only double-invoke (mount → cleanup →
  // mount again) simply revokes one blob and mints a brand new valid one on
  // the second pass, instead of revoking the only copy a memoized value ever
  // had and leaving <img> pointed at a dead blob URL forever.
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    if (typeof value === "string") {
      setPreviewUrl(value);
      return;
    }

    // value is a File — mint a fresh blob URL for this effect run and
    // revoke *this specific* URL (not a shared memoized one) on cleanup.
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

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