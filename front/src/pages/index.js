import React, { useContext } from "react";

import AlertContext from "../context/AlertContext";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout/Layout";
import SEO from "../components/Layout/Seo";
import Alert from "../components/Alert";
import Conversion from "../components/Conversion";
import ImageProvider from "../components/Providers/ImageProvider";

function IndexPage() {
  const { alert } = useContext(AlertContext);

  return (
    <Layout className="relative">
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <AnimatePresence onExitComplete>
        {alert.message && <Alert type={alert.type} message={alert.message} />}
      </AnimatePresence>
      <ImageProvider>
        <section className="text-center container">
          <Conversion />
        </section>
      </ImageProvider>
    </Layout>
  );
}

export default IndexPage;
