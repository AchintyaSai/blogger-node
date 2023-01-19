const multer = require('multer');
const util = require('util');
const maxSize = 200 * 1024 * 1024;
const fs = require("fs")
const AWS = require('aws-sdk');
require('dotenv').config()

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
            if(process.env.UPLOAD_TO_AWS == "true")
                uploadToS3("./file-system/"+ req.query.user_id+"/"+req.file.filename); 
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


const AWSCredentials = {
    accessKey: process.env.AWS_ACCESS_KEY,
    secret: process.env.SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME
};

const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret
});

const uploadToS3 = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: AWSCredentials.bucketName,
        Key: fileName.replace('./', ""),
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};



module.exports = {
    fileUpload
}