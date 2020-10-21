import React from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import uploadPng from "../../images/upload_images.png";
import { motion } from "framer-motion";

export default function ImageUpload({ addImageToList }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  function onDrop(acceptedFiles) {
    console.log(acceptedFiles);
    addImageToList(acceptedFiles);
  }

  return (
    <motion.div
      initial={{ y: 0, x: "+500px", opacity: 0 }}
      animate={{ y: 0, x: 0, opacity: 1 }}
      transition={{ type: "tween" }}
      exit={{ x: "-500px", opacity: 0 }}
      {...getRootProps({ className: "dropzone" })}
      className="flex border-dotted border-2 justify-center items-center h-full   rounded-lg  shadow-inner py-24 "
    >
      <input {...getInputProps()} />
      <div className="w-full flex flex-col justify-center items-center">
        <img
          src={uploadPng}
          alt="Drag 'n' drop upload"
          className="w-1/3 md:w-1/6 "
        />

        <p className="text-gray-700 font-bold md:text-2xl mt-6">
          Drag and Drop Here
        </p>
        <p className="text-gray-500 font-medium md:text-md mt-1">
          Upload up to 8 png, jpeg or jpg files.
        </p>
        <button className="mt-8 bg-blue-900 transition duration-200 hover:bg-blue-800 text-white md:text-md md:px-4 px-2 py-2 md:py-3 rounded font-medium">
          Upload Images
        </button>
      </div>
    </motion.div>
  );
}

ImageUpload.propTypes = {
  addImageToList: PropTypes.func,
};
