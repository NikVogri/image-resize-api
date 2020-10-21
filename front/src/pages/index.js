import React, { useContext } from "react";

import AlertContext from "../context/alertContext";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Alert from "../components/Alert";
import ResizeCard from "../components/ResizeCard";

function IndexPage() {
  const { alert } = useContext(AlertContext);

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      {alert.message && <Alert type={alert.type} message={alert.message} />}
      <section className="text-center container">
        <ResizeCard />
      </section>
    </Layout>
  );
}

export default IndexPage;
