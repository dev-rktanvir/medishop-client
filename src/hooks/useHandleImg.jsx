import { useState } from "react";
import axios from "axios";

const useHandleImg = () => {
    const [preview, setPreview] = useState(null);           // Local preview URL
    const [uploadedUrl, setUploadedUrl] = useState(null);   // Final image URL
    const [loading, setLoading] = useState(false);          // Upload loading state

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Set preview
        setPreview(URL.createObjectURL(file));

        // Prepare form data
        const formData = new FormData();
        formData.append("image", file);

        setLoading(true);
        try {
            const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgUpload_key}`;
            const res = await axios.post(imgUrl, formData);
            const imageUrl = res.data.data.url;
            setUploadedUrl(imageUrl);
        } catch (err) {
            console.error("Image upload failed:", err);
            setUploadedUrl(null);
        } finally {
            setLoading(false);
        }
    };

    // New: Reset everything
    const resetImage = () => {
        setPreview(null);
        setUploadedUrl(null);
    };

    return {
        handleImageChange,
        preview,
        uploadedUrl,
        loading,
        resetImage,
    };
};

export default useHandleImg;
