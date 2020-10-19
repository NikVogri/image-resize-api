import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
// import Alert from "../components/Alert";
import ResizeCard from "../components/ResizeCard";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      {/* <Alert /> */}
      <section className="text-center container">
        <ResizeCard />
      </section>
    </Layout>
  );
}

export default IndexPage;
