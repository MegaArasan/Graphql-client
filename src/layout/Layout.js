import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/header";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-84px-80px)]">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
