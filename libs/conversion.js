const sharp = require("sharp");

exports.convertImageSize = async (imageBuffer, w = 300, h = 300) => {
  return await sharp(imageBuffer).resize(Number(w), Number(h)).toBuffer();
};

exports.trimImage = async (imageBuffer, w = 50, h = 50) => {
  return await sharp(imageBuffer).trim(Number(w), Number(h)).toBuffer();
};

exports.changeImageQuality = async (imageBuffer, quality) => {
  return await sharp(imageBuffer)
    .webp({ quality: Number(quality) })
    .toBuffer();
};

exports.grayscaleImage = async (imageBuffer) => {
  return await sharp(imageBuffer).grayscale().toBuffer();
};

exports.sharpenImage = async (imageBuffer) => {
  return await sharp(imageBuffer).sharpen(100).toBuffer();
};

exports.rotateImage = async (imageBuffer, rotate) => {
  return await sharp(imageBuffer).rotate(Number(rotate)).toBuffer();
};
