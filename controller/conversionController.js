const { convertImageSize, changeImageType } = require("../libs/conversion");

const SUPPORTED_CONVERSION_TYPES = ["png", "webp", "jpeg"];

exports.convert = async (req, res) => {
  const { type } = req.params;

  if (type && SUPPORTED_CONVERSION_TYPES.includes(type)) {
    const convertedImage = await changeImageType(req.file.buffer, type);

    if (!convertedImage) {
      return res.status(500).json({
        success: false,
        msg: `Image could not be converted to ${type}, please try again later.`,
      });
    }

    res.contentType("image/jpeg");
    return res.end(convertedImage);
  }

  res.status(400).json({
    success: false,
    msg: `Either no image type specified, or we don't support that image type, please use: png, jpeg, webp`,
  });
};

exports.resize = async (req, res) => {
  const { width, height } = req.params;

  if (width && height) {
    if (width > 5000 || height > 5000) {
      return res.json({
        success: false,
        msg: "Image height or width is too big, maximum 5000x5000!",
      });
    }

    const convertedImage = await convertImageSize(
      req.file.buffer,
      width,
      height
    );

    if (!convertedImage) {
      return res.json({
        success: false,
        msg: "Image could not be converted, please try again later.",
      });
    }

    res.contentType("image/jpeg");
    return res.end(convertedImage);
  }
  res.status(400).json({
    success: false,
    msg: "Please provide width and height of desired image size.",
  });
};
