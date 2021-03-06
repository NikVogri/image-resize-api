import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function ReadyToUploadImage({ image, removeFromList }) {
  return (
    <motion.div
      className="flex justify-between items-center rounded-lg h-full mb-4 md:mb-0"
      initial={{ left: "-20px" }}
      animate={{ left: 0 }}
      layout
      transition={{ duration: 0.2 }}
    >
      <div className={`flex items-center relative h-full `}>
        <img
          src={
            !image.completed
              ? URL.createObjectURL(image.image)
              : "data:application/octet-stream;base64," + image.download
          }
          alt="Logo"
          style={{ objectFit: "cover" }}
        />
        {!image.completed && (
          <motion.button
            className="bg-red-400 hover:bg-red-500 p-1 rounded-full right-0 top-0 absolute shadow-md mt-2 mr-2"
            onClick={() => removeFromList(image.image)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="text-white toggle__lock w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
        {image.completed && (
          <a
            className="bg-green-400 hover:bg-blue-600 p-2 rounded-lg inset-x-auto absolute shadow-md "
            href={"data:application/octet-stream;base64," + image.download}
            download={image.image.name}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <title>download</title>
              <g fill="none">
                <path
                  d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  stroke="#ffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

ReadyToUploadImage.propTypes = {
  image: PropTypes.object,
  removeFromList: PropTypes.func,
};
