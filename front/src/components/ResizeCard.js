import React, { useState } from "react";
import ImageUpload from "./UploadForm/ImageUpload";
import StartConversion from "./UploadForm/StartConversion";

import axios from "axios";

export default function Card() {
  const [images, setImages] = useState([]);
  const [showUpload, setShowUpload] = useState(true);
  const [conversionFinished, setConversionFinished] = useState(false);

  const addImageToListHandler = (uploadedImages) => {
    let unique = true;

    if (uploadedImages.length > 8) {
      console.log("Up to 8 images");
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
    setImages((prevImages) =>
      prevImages.filter((image) => image.image !== imageToRemove)
    );
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
    <div
      className="bg-white w-full rounded-lg shadow  p-6"
      style={{ height: "70vh" }}
    >
      {showUpload && <ImageUpload addImageToList={addImageToListHandler} />}
      {!showUpload && (
        <StartConversion
          uploadedImages={images}
          removeFromList={removeImageFromListHandler}
          convertImages={convertImagesHandler}
          conversionFinished={conversionFinished}
          showUploadForm={resetHandler}
        />
      )}
    </div>
  );
}
