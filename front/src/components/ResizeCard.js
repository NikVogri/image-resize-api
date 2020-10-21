import React, { useState, useContext } from "react";
import ImageUpload from "./UploadForm/ImageUpload";
import StartConversion from "./UploadForm/StartConversion";
import { AnimatePresence } from "framer-motion";
import AlertContext from "../context/alertContext";

import axios from "axios";

export default function Card() {
  const [images, setImages] = useState([]);
  const [showUpload, setShowUpload] = useState(true);
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
      setShowUpload(false);
    } else {
      console.log("Image exists");
    }
  };

  const removeImageFromListHandler = (imageToRemove) => {
    setImages((prevImages) => {
      if (prevImages.length === 1) {
        setShowUpload(true);
        return [];
      } else {
        return prevImages.filter((image) => image.image !== imageToRemove);
      }
    });
  };

  const convertImagesHandler = async (width, height) => {
    console.log(images);
    try {
      let newImagesState = [...images];
      for (let i = 0; i < images.length; i++) {
        newImagesState[i] = {
          ...images[i],
          loading: true,
        };
        setImages(newImagesState);

        const imageData = new FormData();
        imageData.append("image", images[i].image);

        const res = await axios.post(
          `${process.env.GATSBY_API_URL}/api/v1/resize/${width}/${height}`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

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
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const resetHandler = () => {
    setShowUpload(true);
    setImages([]);
    setConversionFinished(false);
  };

  return (
    <div className="bg-white w-full rounded-lg shadow  p-6 overflow-hidden">
      <AnimatePresence>
        {showUpload && !images.length && (
          <ImageUpload addImageToList={addImageToListHandler} />
        )}

        {!showUpload && images.length && (
          <StartConversion
            uploadedImages={images}
            removeFromList={removeImageFromListHandler}
            convertImages={convertImagesHandler}
            conversionFinished={conversionFinished}
            showUploadForm={resetHandler}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
