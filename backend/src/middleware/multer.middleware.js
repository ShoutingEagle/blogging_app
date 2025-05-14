import multer from "multer"
import fs from "fs"
import path from "path"

const tempDir = path.resolve("public/temp")

if(!fs.existsSync(tempDir)){
    fs.mkdir(tempDir,{recursive:true})
    console.log("✅ Created missing folder: public/temp");
}

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        console.log("file => ",file)
        cb(null,"./public/temp")
    },
    filename : function (req,file,cb) {
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload