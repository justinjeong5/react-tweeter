const AWS = require('aws-sdk');
const sharp = require('sharp')

const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = decodeURIComponent(event.Records[0].s3.object.key);
  console.log(Bucket, Key);

  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase();
  console.log(`filename: ${filename}, ext: ${ext}`)

  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log(`original size: ${Math.floor(s3Object.Body.length / (1024 * 1024))} MB`)

    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: 'inside' })
      .toFormat(requiredFormat)
      .toBuffer();
    console.log(`resized size: ${Math.floor(resizedImage.length / (1024 * 1024))} MB`)

    await s3.putObject({
      Bucket,
      Key: `thumbnail/${filename}`,
      Body: resizedImage
    }).promise();

    return callback(null, `thumbnail/${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
}