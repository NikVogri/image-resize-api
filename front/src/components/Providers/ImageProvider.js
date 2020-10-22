import React, { useState, useContext } from "react";
import ImageContext from "../../context/imageContext";
import AlertContext from "../../context/alertContext";
import PropTypes from "prop-types";
import axios from "axios";

export default function AlertProvider({ children }) {
  const [images, setImages] = useState([]);
  const [conversionFinished, setConversionFinished] = useState(false);
  const { addAlert } = useContext(AlertContext);

  const addImageToListHandler = (uploadedImages) => {
    let unique = true;

    console.log("adding images", uploadedImages);

    if (uploadedImages.length > 8) {
      addAlert("Upload a maximum of 8 images!", "danger");
      return;
    }

    if (!uploadedImages.length) {
      addAlert(
        "Uploaded file type is not supported, supported file types: png, jpeg and jpg.",
        "warning"
      );
      return;
    }

    images.forEach((image) => {
      uploadedImages.forEach((uploadedImage) => {
        console.log(image.image, uploadedImage);
        if (image.image.name === uploadedImage.name) {
          unique = false;
        }
      });
    });

    const cleanUploadedImages = uploadedImages.map((image) => ({
      loading: false,
      image: image,
      completed: false,
      download: null,
    }));

    if (unique) {
      setImages([...images, ...cleanUploadedImages]);
      // setShowUpload(false);
    } else {
      console.log("Image exists");
    }
  };

  const removeImageFromListHandler = (imageToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.image !== imageToRemove)
    );
  };

  const convertImagesHandler = async (configuration) => {
    try {
      let newImagesState = [...images];
      for (let i = 0; i < images.length; i++) {
        newImagesState[i] = {
          ...images[i],
          loading: true,
        };
        setImages(newImagesState);

        const data = new FormData();
        data.append("image", images[i].image);
        data.append("config", JSON.stringify(configuration));

        const res = await axios.post(
          `${process.env.GATSBY_API_URL}/api/v1/modify`,
          data
        );

        console.log("response", res);

        newImagesState = [...newImagesState];
        newImagesState[i] = {
          ...images[i],
          loading: false,
          download: res.data,
          completed: true,
        };
        setImages(newImagesState);
        setConversionFinished(true);
      }
      return true;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const resetHandler = () => {
    // setShowUpload(true);
    setImages([]);
    setConversionFinished(false);
  };

  return (
    <ImageContext.Provider
      value={{
        conversionFinished: conversionFinished,
        addImages: addImageToListHandler,
        resetImages: resetHandler,
        images: images,
        removeImage: removeImageFromListHandler,
        convertImages: convertImagesHandler,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
