import PropTypes from "prop-types";
import React from "react";

import Header from "./header";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />

      <main className="flex-1 w-full container mx-auto mt-4 md:mt-12 px-4 md:px-0">
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
