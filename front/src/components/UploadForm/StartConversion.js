import React, { useState } from "react";
import PropTypes from "prop-types";
// import uploadPng from "../images/upload_images.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import Image from "./Image";

export default function ImageBeginConversion({
  uploadedImages,
  removeFromList,
  convertImages,
  conversionFinished,
  showUploadForm,
}) {
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);
  return (
    <div className="flex border-dotted border-2 justify-center items-center h-full rounded-lg  shadow-inner py-24">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 mx-auto">
          {uploadedImages.map((image) => (
            <Image
              image={image}
              key={image.image.path}
              removeFromList={removeFromList}
            />
          ))}
        </div>
        {!conversionFinished ? (
          <>
            <div className="block mt-6 md:flex items-center">
              <div className="flex items-center">
                <input
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="username"
                  type="number"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                ></input>
              </div>
              <span className="mx-3 font-bold text-gray-400">X</span>
              <div className="flex items-center">
                <input
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="height"
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                ></input>
              </div>
            </div>
            <button
              className="mt-8 bg-blue-900 transition duration-200 hover:bg-blue-800 text-white md:text-md md:px-4 px-2 py-2 md:py-3 rounded font-medium"
              onClick={() => convertImages(width, height)}
            >
              <FontAwesomeIcon icon={faSync} className="mr-2" /> Convert
            </button>
          </>
        ) : (
          <button
            className="mt-8 bg-blue-900 transition duration-200 hover:bg-blue-800 text-white md:text-md md:px-4 px-2 py-2 md:py-3 rounded font-medium"
            onClick={showUploadForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="inline-block mr-2 mb-1"
            >
              <title>check-circle-07</title>
              <g fill="#fff">
                <path d="M5.7,7.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l2,2C6.5,10.9,6.7,11,7,11s0.5-0.1,0.7-0.3l7-7 c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L7,8.6L5.7,7.3z"></path>{" "}
                <path
                  fill="#fff"
                  d="M7,16c3.9,0,7-3.1,7-7c0-0.6-0.4-1-1-1s-1,0.4-1,1c0,2.8-2.2,5-5,5s-5-2.2-5-5s2.2-5,5-5 c0.6,0,1.1,0.1,1.7,0.3c0.5,0.2,1.1-0.1,1.3-0.6c0.2-0.5-0.1-1.1-0.6-1.3C8.6,2.1,7.8,2,7,2C3.1,2,0,5.1,0,9S3.1,16,7,16z"
                ></path>
              </g>
            </svg>
            <span>Upload new Images</span>
          </button>
        )}
      </div>
    </div>
  );
}

ImageBeginConversion.propTypes = {
  uploadedImages: PropTypes.array,
  removeFromList: PropTypes.func,
  convertImages: PropTypes.func,
  conversionFinished: PropTypes.bool,
  showUploadForm: PropTypes.func,
};
