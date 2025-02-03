import React from "react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const TextExtractor = () => {
  return (
    <div className="d-flex flex-column">
      <MainContent/>
      {/* <Footer/> */}
    </div>
  );
};

export default TextExtractor;
