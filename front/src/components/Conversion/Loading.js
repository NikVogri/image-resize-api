import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ImageContext from "../../context/ImageContext";
import PropTypes from "prop-types";

export default function Loading({ nextComponent }) {
  const { images, loading } = useContext(ImageContext);

  useEffect(() => {
    if (!loading) {
      nextComponent();
    }
  }, [loading]);
  return (
    <motion.div
      initial={{ x: "+500px", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-500px", opacity: 0 }}
      transition={{ type: "tween" }}
      className="flex justify-center items-center h-full rounded-lg  shadow-inner py-4 md:py-24"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <div className="md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 mx-auto">
          {new Array(images.length).fill().map((_, i) => (
            <div className="animate-pulse mb-4 md:mb-0" key={i}>
              <div className="bg-gray-400 h-32 w-32"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

Loading.propTypes = {
  nextComponent: PropTypes.func.isRequired,
};
