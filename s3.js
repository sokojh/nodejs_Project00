require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

//환경변수 설정 바뀔일이 없으니 const로 선언해준다.
const bucketName = process.env.AWS_BUCKET_NAME 
const region = process.env.AWS_BUCKET_REGION 
const accessKeyId= process.env.AWS_ACCESS_KEY 
const secretAccessKey = process.env.AWS_SECRET_KEY 

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

//s3에 파일 업로드하기
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket : bucketName,
        Body : fileStream,
        Key : file.filename

    }
    return s3.upload(uploadParams).promise()

} 
exports.uploadFile = uploadFile

 
//s3에 파일 다운로드하기

function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName


    }
    return s3.getObject(downloadParams).createReadStream()



}
exports.getFileStream = getFileStream