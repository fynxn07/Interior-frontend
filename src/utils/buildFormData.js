export function buildFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;

    if (value instanceof File) {
      formData.append(key, value);
    }

    else if (Array.isArray(value)) {

      // Multiple image upload
      if (key === "gallery_images") {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("gallery_images", file);
          }
        });
      }

      // Existing behaviour for text arrays
      else {
        formData.append(key, value.join("\n"));
      }

    }

    else if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    }

    else {
      formData.append(key, value);
    }
  });

  return formData;
}