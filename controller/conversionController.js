const {
  convertImageSize,
  trimImage,
  changeImageQuality,
  sharpenImage,
  grayscaleImage,
  rotateImage,
} = require("../libs/conversion");

const SUPPORTED_CONVERSION_TYPES = ["png", "webp", "jpeg"];

exports.modify = async (req, res) => {
  console.log(req.body);
  const { resize, trim, sharpen, grayscale, quality, rotate } = JSON.parse(
    req.body.config
  );

  let convertedImage;
  if (resize.width && resize.height) {
    if (resize.width > 5000 || resize.height > 5000) {
      return res.json({
        success: false,
        msg: "Image height or width is too big, maximum 5000x5000!",
      });
    }

    convertedImage = await convertImageSize(
      convertedImage || req.file.buffer,
      resize.width,
      resize.height
    );

    if (!convertedImage) {
      return res.json({
        success: false,
        msg: "Image could not be converted, please try again later.",
      });
    }
  }

  if (trim.width && trim.height) {
    convertedImage = await trimImage(
      convertedImage || req.file.buffer,
      trim.width,
      trim.height
    );

    if (!convertedImage) {
      return res.json({
        success: false,
        msg: "Image could not be trimmed, please try again later.",
      });
    }
  }

  if (sharpen) {
    convertedImage = await sharpenImage(convertedImage || req.file.buffer);

    if (!convertedImage) {
      return res.json({
        success: false,
        msg: "Image could not be sharpened, please try again later.",
      });
    }
  }

  if (quality) {
    convertedImage = await changeImageQuality(
      convertedImage || req.file.buffer,
      quality
    );

    if (!convertedImage) {
      return res.json({
        success: false,
        msg: "Image could not change image quality, please try again later.",
      });
    }
  }

  if (grayscale) {
    convertedImage = await grayscaleImage(
      convertedImage || req.file.buffer,
      quality
    );

    if (!convertedImage) {
      return res.json({
        success: false,
        msg: "Image could not be grayscaled, please try again later.",
      });
    }
  }

  if (rotate) {
    convertedImage = await rotateImage(
      convertedImage || req.file.buffer,
      rotate
    );

    if (!convertedImage) {
      return res.json({
        success: false,
        msg: "Image could not be rotated, please try again later.",
      });
    }
  }

  res.contentType("image/jpeg");
  return res.end(convertedImage.toString("base64"));
};
