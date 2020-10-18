import React, { useState } from "react";
import Image from "./Image";
import ImageUpload from "./ImageUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Card() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const addImageToListHandler = (uploadedImages) => {
    let unique = true;

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
    } else {
      console.log("Image exists");
    }
  };

  const removeImageFromListHandler = (imageToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.image !== imageToRemove)
    );
  };

  const convertImagesHandler = async () => {
    console.log(images);
    try {
      setLoading(true);
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
          "http://localhost:3000/api/v1/resize/50/50",
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
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  console.log(loading);

  return (
    <div className="bg-white w-full md:max-w-4xl rounded-lg shadow py-4">
      <div className="h-12 border-b border-gray-200 m-4">
        <div className="text-xl text-left font-bold text-gray-700 pt-3">
          Upload Images
        </div>
      </div>

      <div className="px-6">
        <ImageUpload addImageToList={addImageToListHandler} />

        {images.map((image) => (
          <Image
            image={image}
            key={image.image.lastModified}
            removeFromList={removeImageFromListHandler}
          />
        ))}
      </div>
      {images.length ? (
        <div className="p-6 ">
          <button
            onClick={convertImagesHandler}
            className="p-4 bg-green-400 hover:bg-green-500 w-full rounded-lg shadow text-xl font-medium uppercase text-white"
          >
            Convert{" "}
            <span>
              <FontAwesomeIcon icon={faSync} />
            </span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
