import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function Image({ image, removeFromList }) {
  // const [download, setDownload] = useState(null);

  useEffect(() => {
    console.log(image);
  }, [image]);
  return (
    <div className="flex justify-between items-center h-16 p-4 my-6 rounded-lg border border-gray-100 shadow-md relative">
      <div
        className={`
        absolute
        z-30
        inset-0
        py-6
        rounded-lg
        bg-green-400
        w-0
        text-white
        loading-transition
        ${image.loading && "w-6/12"}
        ${image.completed && "w-full"}`}
      ></div>

      <div className="flex items-center relative z-30">
        <img
          className="rounded-full h-12 w-12"
          src={URL.createObjectURL(image.image)}
          alt="Logo"
        />
        <div className="ml-2">
          <div
            className={`text-sm font-semibold ${
              image.loading || (image.completed && "text-gray-600")
            }`}
          >
            <span>{image.image.name}</span>
          </div>
        </div>
      </div>
      <div className="relative z-30">
        {!image.completed && (
          <button
            className="bg-red-400 hover:bg-red-500 p-2 rounded-full shadow-md flex justify-center items-center"
            onClick={() => removeFromList(image.image)}
          >
            <svg
              className="text-white toggle__lock w-6 h-6"
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
          </button>
        )}
        {image.completed && (
          <a
            className="bg-red-400 hover:bg-blue-600 p-2 rounded-full shadow-md flex justify-center items-center"
            href={"data:application/octet-stream;base64," + image.download}
            download={image.image.name}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
    </div>
  );
}

Image.propTypes = {
  image: PropTypes.object,
  removeFromList: PropTypes.func,
  loading: PropTypes.bool,
};
