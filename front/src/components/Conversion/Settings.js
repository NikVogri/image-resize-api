import React, { useState, useContext } from "react";
import ImageContext from "../../context/ImageContext";
import AlertContext from "../../context/AlertContext";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function ImageSettings({ nextComponent }) {
  const [resize, setResize] = useState(false);
  const [trim, setTrim] = useState(false);
  const [quality, setQuality] = useState(false);
  const [rotate, setRotate] = useState(false);

  const [configuration, setConfiguration] = useState({
    resize: { width: undefined, height: undefined },
    trim: { width: undefined, height: undefined },
    quality: undefined,
    sharpen: false,
    grayscale: false,
    rotate: undefined,
    output: "",
  });

  const { convertImages } = useContext(ImageContext);
  const { addAlert } = useContext(AlertContext);

  const changeHandler = (val, key) => {
    setConfiguration((prevConfiguration) => {
      const oldConf = { ...prevConfiguration };
      oldConf[key] = val;
      return oldConf;
    });
  };

  const sizeChangeHandler = (val, key) => {
    setConfiguration((prevConfiguration) => {
      const oldConf = { ...prevConfiguration };
      oldConf.resize[key] = val;
      return oldConf;
    });
  };

  const trimChangeHandler = (val, key) => {
    setConfiguration((prevConfiguration) => {
      const oldConf = { ...prevConfiguration };
      oldConf.trim[key] = val;
      return oldConf;
    });
  };

  const convertHandler = async () => {
    try {
      const res = await convertImages(configuration);

      if (!res) {
        addAlert("Images could not be converted, please try again later.");
      }
    } catch (err) {
      addAlert(err.message);
    } finally {
      nextComponent();
    }
  };

  console.log(configuration);
  return (
    <motion.div
      initial={{ x: "+500px", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-500px", opacity: 0 }}
      transition={{ type: "tween" }}
      className=" md:flex justify-around text-left items-center h-full rounded-lg  shadow-inner py-24"
    >
      <div>
        <h4 className="text-left font-bold text-lg my-3">Resize</h4>
        <div>
          <div>
            <div className="flex items-center">
              <input type="checkbox" onClick={() => setResize(!resize)} />
              <input
                onChange={(e) => sizeChangeHandler(e.target.value, "width")}
                disabled={!resize}
                type="number"
                placeholder="width"
                value={configuration.resize.width}
                className="w-1/2 ml-3 md:w-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />

              <input
                onChange={(e) => sizeChangeHandler(e.target.value, "height")}
                disabled={!resize}
                type="number"
                placeholder="height"
                value={configuration.resize.height}
                className="w-1/2 md:w-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <h4 className="text-left font-bold text-lg my-3">Trim</h4>

          <div className="flex items-center">
            <input type="checkbox" onClick={() => setTrim(!trim)} />
            <input
              onChange={(e) => trimChangeHandler(e.target.value, "width")}
              value={configuration.trim.width}
              disabled={!trim}
              type="number"
              placeholder="width"
              className="w-1/2 md:w-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ml-3 md:mr-3"
            />

            <input
              onChange={(e) => trimChangeHandler(e.target.value, "height")}
              value={configuration.trim.height}
              disabled={!trim}
              type="number"
              placeholder="height"
              className="w-1/2 md:w-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <h4 className="text-left font-bold text-lg my-3">Quality</h4>

            <input type="checkbox" onClick={() => setQuality(!quality)} />
            <input
              disabled={!quality}
              onChange={(e) => changeHandler(e.target.value, "quality")}
              type="number"
              placeholder="Quality (1-100)"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ml-3 mr-3"
            />
            <div>
              <input
                className="mb-2 mt-4 mr-5"
                type="checkbox"
                id="sharpen"
                onChange={() =>
                  changeHandler(!configuration.sharpen, "sharpen")
                }
              />
              <label htmlFor="sharpen">Sharpen</label>
            </div>
          </div>

          <div>
            <input
              className="mb-4 mt-2 mr-5"
              type="checkbox"
              id="grayscale"
              onChange={() =>
                changeHandler(!configuration.grayscale, "grayscale")
              }
            />
            <label htmlFor="grayscale">Grayscale</label>
          </div>

          <div>
            <input type="checkbox" onClick={() => setRotate(!rotate)} />
            <input
              disabled={!rotate}
              onChange={(e) => changeHandler(e.target.value, "rotate")}
              type="number"
              placeholder="Rotate (deg)"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ml-3 mr-3"
            />
          </div>

          <h4 className="text-left font-bold text-lg my-3">Output Options</h4>

          <input
            type="radio"
            id="png"
            name="type"
            className=" mr-2"
            onClick={() => changeHandler("png", "output")}
          />
          <label htmlFor="png">Png</label>

          <input
            type="radio"
            id="webp"
            name="type"
            className="ml-4 mr-2"
            onClick={() => changeHandler("webp", "output")}
          />
          <label htmlFor="webp">Webp</label>
        </div>
        <button className="button" onClick={convertHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="ml-2 "
          >
            <title>Start converting</title>
            <g fill="#fff">
              <path d="M7.13 9.13c-0.5-0.5-1.25-0.5-1.75-0.01s-0.5 1.25 0 1.75l2.5 2.5c0.25 0.25 0.5 0.38 0.87 0.38s0.63-0.13 0.88-0.38l8.75-8.75c0.5-0.5 0.5-1.25 0-1.75s-1.25-0.5-1.75 0l-7.88 7.88-1.62-1.62z"></path>
              <path
                fill="#fff"
                d="M8.75 20c4.88 0 8.75-3.88 8.75-8.75 0-0.75-0.5-1.25-1.25-1.25s-1.25 0.5-1.25 1.25c0 3.5-2.75 6.25-6.25 6.25s-6.25-2.75-6.25-6.25 2.75-6.25 6.25-6.25c0.75 0 1.38 0.13 2.13 0.38 0.63 0.25 1.38-0.13 1.62-0.76 0.25-0.63-0.13-1.38-0.75-1.62-1-0.37-2-0.5-3-0.5-4.88 0-8.75 3.87-8.75 8.75s3.88 8.75 8.75 8.75z"
              ></path>
            </g>
          </svg>
          <span>Start Converting</span>
        </button>
      </div>
    </motion.div>
  );
}

ImageSettings.propTypes = {
  nextComponent: PropTypes.func,
};
