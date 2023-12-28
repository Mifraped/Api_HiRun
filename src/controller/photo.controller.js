const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../database");

const uploadPhoto = async (req, res) => {
    console.log(req.file);
    const params = {
        Bucket: "hirunphotos",
        Key: req.file.originalname,
        Body: req.file.buffer
    };
    try {
        const uploadResult = await s3Client.send(new PutObjectCommand(params));
        // obtener url firmada
        // const urlParams = { Bucket: 'hirunphotos', Key: req.file.originalname };
        // const command = new GetObjectCommand(urlParams);
        // const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        const url = `https://hirunphotos.s3.eu-west-3.amazonaws.com/${req.file.originalname}`
        let response
        if (url) {
            response = {
                error: false,
                codigo: 200,
                message: "Photo uploaded successfully",
                data: url
            }
        } else {
            response = {
                error: true,
                codigo: 500,
                message: "Error uploading photo",
                data: null
            }
        }
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { uploadPhoto }