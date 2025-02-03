
import React from "react"
import TextExtractor from "./TextExtractor"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AadharCardUpload from "./components/Upload/AadharCardUpload"
import LocalUpload from "./components/Upload/LocalUpload";
import GoogleDriveUpload from "./components/Upload/GoogleDriveUpload";
import DropboxUpload from "./components/Upload/DropboxUpload";
import OneDriveUpload from "./components/Upload/OneDriveUpload";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<TextExtractor/>} />
        <Route path="/upload/aadhar-card" element={<AadharCardUpload/>} />
        {/* <Route path="/upload/local" element={<LocalUpload/>} />
        <Route path="/upload/google-drive" element={<GoogleDriveUpload/>} />
        <Route path="/upload/dropbox" element={<DropboxUpload/>} />
        <Route path="/upload/onedrive" element={<OneDriveUpload/>} /> */}
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
