import React, { useContext } from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import { motion } from "framer-motion";
import ImageContext from "../../context/ImageContext";

export default function UploadedImages({ nextComponent }) {
  const { images, removeImage } = useContext(ImageContext);

  return (
    <motion.div
      initial={{ x: "+500px", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-500px", opacity: 0 }}
      transition={{ type: "tween" }}
      className="flex justify-center items-center h-full rounded-lg  shadow-inner py-24"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 mx-auto">
          {images.map((image) => (
            <Image
              image={image}
              key={image.image.path}
              removeFromList={removeImage}
            />
          ))}
        </div>

        <button className="button" onClick={nextComponent}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="ml-2"
          >
            <g fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-8.707l-3-3a1 1 0 0 0-1.414 1.414L10.586 9H7a1 1 0 1 0 0 2h3.586l-1.293 1.293a1 1 0 1 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414z"
                fill="#fff"
              ></path>
            </g>
          </svg>
          <span>Next</span>
        </button>
      </div>
    </motion.div>
  );
}

UploadedImages.propTypes = {
  nextComponent: PropTypes.func,
};
