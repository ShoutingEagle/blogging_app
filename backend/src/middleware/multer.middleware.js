import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = path.resolve("public/temp");

// Ensure the folder exists
try {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
        console.log("✅ Created missing folder: public/temp");
    }
} catch (error) {
    console.error("❌ Error creating upload folder:", error);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

export default upload;
