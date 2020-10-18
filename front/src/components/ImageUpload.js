import React from "react";
import { useDropzone } from "react-dropzone";

import PropTypes from "prop-types";

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
    <section>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex bg-gray-200 justify-center items-center h-16 p-4 my-6  rounded-lg  shadow-inner py-24"
      >
        <input {...getInputProps()} />
        <svg
          className="text-gray-500 w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <div className="ml-1 text-gray-500 font-medium">
          Click or Images Drop Here
        </div>
      </div>
    </section>
  );
}

ImageUpload.propTypes = {
  addImageToList: PropTypes.func,
};
