import React, { useState, useContext } from "react";
import ImageContext from "../../context/ImageContext";
import AlertContext from "../../context/AlertContext";
import PropTypes from "prop-types";
import axios from "axios";

export default function AlertProvider({ children }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addAlert } = useContext(AlertContext);

  const addImageToListHandler = (uploadedImages) => {
    console.log("adding images", uploadedImages);

    if (uploadedImages.length > 8) {
      return addAlert("Upload a maximum of 8 images!", "danger");
    }

    const cleanUploadedImages = uploadedImages.map((image) => {
      const uploadedImage = {
        loading: false,
        image: image,
        completed: false,
        download: null,
      };

      if (images.indexOf(uploadedImage) === -1) {
        return uploadedImage;
      }
    });

    setImages([...images, ...cleanUploadedImages]);
  };

  const removeImageFromListHandler = (imageToRemove) => {
    if (images.length - 1 === 0) return resetHandler();

    setImages((prevImages) =>
      prevImages.filter((image) => image.image !== imageToRemove)
    );

    console.log(images);
  };

  const convertImagesHandler = async (configuration) => {
    setLoading(true);
    try {
      for (let i = 0; i < images.length; i++) {
        const res = await axios.post(
          `${process.env.GATSBY_API_URL}/api/v1/modify`,
          getFormData(images[i].image, configuration)
        );

        console.log("response", res);

        setImages((prevImages) => {
          const newImages = [...prevImages];

          newImages[i] = {
            ...images[i],
            download: res.data,
            completed: true,
          };

          return newImages;
        });
      }
      setLoading(false);
      return true;
    } catch (err) {
      addAlert("Images could not be converted, please try again later!");
    }
  };

  const getFormData = (image, configuration) => {
    const data = new FormData();
    data.append("image", image);
    data.append("config", JSON.stringify(configuration));
    return data;
  };

  const resetHandler = () => {
    setImages([]);
  };

  return (
    <ImageContext.Provider
      value={{
        add: addImageToListHandler,
        reset: resetHandler,
        loading,
        images,
        remove: removeImageFromListHandler,
        convert: convertImagesHandler,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
