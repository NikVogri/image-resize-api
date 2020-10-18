const sharp = require("sharp");

exports.convertImageSize = async (imageBuffer, w = 300, h = 300) => {
  const resizedImage = await await sharp(imageBuffer)
    .resize(Number(w), Number(h))
    .toBuffer();

  return resizedImage.toString("base64");
};

exports.changeImageType = async (imageBuffer, type) => {
  return await sharp(imageBuffer).toFormat(type).toBuffer();
};
