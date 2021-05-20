const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;


const imageService = require('../images/image.service');
const { any } = require("joi");


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/public");
    },
    filename: (req, file, cb) => {
        console.log("filename:", file);
        console.log("upload.js " + file.originalname);

        const params = {
            "username": "KMH",
            "src": file.originalname
        };
        imageService.create_image(params);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;