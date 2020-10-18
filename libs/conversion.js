const sharp = require("sharp");

exports.convertImageSize = async (imageBuffer, w = 300, h = 300) => {
  return await sharp(imageBuffer).resize(Number(w), Number(h)).toBuffer();
};

exports.changeImageType = async (imageBuffer, type) => {
  return await sharp(imageBuffer).toFormat(type).toBuffer();
};
