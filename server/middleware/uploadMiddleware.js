const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.IMAGE_UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        //const date = new Date().toISOString().replace(/:/g, '-').slice(0, -5);
        const uniqueSuffix = Math.round(Math.random() * 1E9); 
        cb(null, uniqueSuffix + " " + file.originalname)
    }
});
const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
    upload.array('images', 5)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        }

        const images = req.files;
        const errors = [];

        images.forEach(element => {
            const maxFileSize = 25 * 1024 * 1024;
            const allowedFileExtensions = ['image/jpeg', 'image/png'];

            if (!allowedFileExtensions.includes(element.mimetype)) {
                errors.push(`Invalid file type: ${element.originalname}`);
            }
            if (maxFileSize < element.size) {
                errors.push(`Image too large to upload: ${element.originalname}`)
            }
        });

        if (errors.length > 0) {
            images.forEach(element => {
                fs.unlinkSync(element.path);
            });

            return res.status(400).json({ errors });
        }

        req.files = images;

        next();
    });
};

module.exports = uploadMiddleware;