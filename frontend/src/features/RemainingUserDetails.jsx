import { useState } from "react";

const RemainingUserDetails = () => {
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                setMessage("Image should be less than 1MB.");
                setPreview(null);
            } else {
                setMessage("");
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result);
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-6">
            <p className="text-2xl font-semibold text-emerald-600">Complete Your Profile</p>

            {/* Message area */}
            <div className="min-h-[24px] text-sm text-center w-full text-rose-500">
                {message}
            </div>

            {/* Image Upload Section */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-dashed border-emerald-400 relative group">
                {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-400 text-sm">
                        Upload Image
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {/* Username input */}
            <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />

            {/* Submit Button */}
            <button
                className="w-full py-3 rounded-md bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold hover:opacity-90 transition"
            >
                Finish Setup
            </button>
        </div>
    );
};

export default RemainingUserDetails;
