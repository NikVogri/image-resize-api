import React, { useContext } from "react";

import AlertContext from "../context/alertContext";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Alert from "../components/Alert";
import ResizeCard from "../components/ResizeCard";
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
          <ResizeCard />
        </section>
      </ImageProvider>
    </Layout>
  );
}

export default IndexPage;
