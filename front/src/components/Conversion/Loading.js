import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ImageContext from "../../context/ImageContext";
import PropTypes from "prop-types";

export default function Loading({ nextComponent }) {
  const { loading } = useContext(ImageContext);

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
        <div className="animate-pulse mb-4">
          <div className="bg-gray-400 h-32 w-32"></div>
        </div>
        <p className="text-blue-800 font-bold text-2xl">Loading...</p>
      </div>
    </motion.div>
  );
}

Loading.propTypes = {
  nextComponent: PropTypes.func.isRequired,
};
