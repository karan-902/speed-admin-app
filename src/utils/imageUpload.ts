import axios from "axios";
import type { TCloudinaryResponse } from "../types";

export default async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );
    const res = await axios<TCloudinaryResponse>({
      baseURL: import.meta.env.VITE_CLOUDINARY_URL as string,
      url: "/image/upload",
      method: "POST",
      data: formData,
    });
    return {
      public_id: res.data.public_id,
      url: res.data.secure_url,
    };
  } catch (error) {
    console.error(error);
  }
}
