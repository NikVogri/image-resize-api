import React, { useState } from "react";
import ImageUpload from "./UploadForm/ImageUpload";
import UploadedImages from "./UploadForm/UploadedImages";
import ImageSettings from "./ImageSettings";
import { AnimatePresence } from "framer-motion";

const COMPONENT_LIST_PATH = ["upload", "uploaded_images", "configuration"];

export default function Card() {
  const [component, setComponent] = useState("upload");

  const nextComponentHandler = () => {
    console.log("here next component");
    const step = COMPONENT_LIST_PATH.indexOf(component);
    setComponent(COMPONENT_LIST_PATH[step + 1]);
  };

  return (
    <div className="bg-white w-full rounded-lg shadow  p-6 overflow-hidden">
      <AnimatePresence>
        {component === "upload" && (
          <ImageUpload nextComponent={nextComponentHandler} />
        )}
        {component === "uploaded_images" && (
          <UploadedImages nextComponent={nextComponentHandler} />
        )}
        {component === "configuration" && (
          <ImageSettings nextComponent={nextComponentHandler} />
        )}
      </AnimatePresence>
    </div>
  );
}
