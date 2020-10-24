import React, { useState } from "react";
import Upload from "./Conversion/Upload";
import UploadedList from "./Conversion/UploadedList";
import Settings from "./Conversion/Settings";
import Download from "./Conversion/Download";
import Loading from "./Conversion/Loading";

import { AnimatePresence } from "framer-motion";

const COMPONENT_LIST_PATH = [
  "upload",
  "uploaded_images",
  "configuration",
  "loading",
  "download_images",
];

export default function Card() {
  const [component, setComponent] = useState("upload");

  const nextComponentHandler = (index) => {
    if (typeof index === "number") {
      return setComponent(COMPONENT_LIST_PATH[index]);
    }

    const step = COMPONENT_LIST_PATH.indexOf(component);

    if (step === COMPONENT_LIST_PATH.length - 1) {
      return setComponent(COMPONENT_LIST_PATH[0]);
    }

    setComponent(COMPONENT_LIST_PATH[step + 1]);
  };

  return (
    <div className="bg-white w-full rounded-lg shadow  p-6 overflow-hidden mb-4">
      <AnimatePresence>
        {component === "upload" && (
          <Upload nextComponent={nextComponentHandler} />
        )}
        {component === "uploaded_images" && (
          <UploadedList nextComponent={nextComponentHandler} />
        )}
        {component === "configuration" && (
          <Settings nextComponent={nextComponentHandler} />
        )}
        {component === "download_images" && (
          <Download nextComponent={nextComponentHandler} />
        )}
        {component === "loading" && (
          <Loading nextComponent={nextComponentHandler} />
        )}
      </AnimatePresence>
    </div>
  );
}
