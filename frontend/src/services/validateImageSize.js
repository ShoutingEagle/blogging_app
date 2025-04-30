const validateImageSize = (file) => {
    return new Promise((resolve,reject) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)

        img.onload = () => {
            if(img.width > 200 || img.length > 200){
                reject(new Error(`⚠️ Image exceeds the maximum allowed size of 200x200px.`))
            }
            else{
                resolve()
            }
        }

        img.onerror = () => {
            reject(new Error("⚠️ Invalid image file."))
        }
    })
}

export default validateImageSize