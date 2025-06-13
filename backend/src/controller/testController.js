import multer from "multer";

// Memory storage so the file is not saved on disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// This wraps your controller logic to include multer parsing
const testController = async (req, res) => {
  // Run multer manually here
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    console.log("📝 Form fields:", req.body);   // All text fields
    console.log("🖼️ Uploaded file:", req.file);  // The image

    return res.status(201).json({ message: "All OK ✅", data: req.body });
  });
};

export default testController;
