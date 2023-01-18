const multer = require('multer');
const util = require('util');
const maxSize = 200 * 1024 * 1024;
const fs = require("fs")

let storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, req.query.user_id+"_"+file.originalname)
    },
    destination: (req, file, cb) => {
        if(!fs.existsSync('./file-system/'+ req.query.user_id))
            fs.mkdirSync('./file-system/'+ req.query.user_id);
        cb(null, "./file-system/"+ req.query.user_id)
    }
})

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");


const fileUpload = (req, res) => {
    try {
        console.log("2")
        uploadFile(req, res, (err) => {
            if (err)
            {
                console.error(err)
                res.status(500).send({
                    message: "FIles not uploaded correctly",
                });    
                return
            }
            res.status(200).send({
                message: "Uploaded the file successfully: "+ req.file.originalname,
            });
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
}
module.exports = {
    fileUpload
}