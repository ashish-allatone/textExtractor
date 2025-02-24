import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGoogleDrive, FaDropbox, FaLaptop, FaCloud } from "react-icons/fa";
import "./MainContent.css";

const MainContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
  
    setFile(selectedFile);
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await fetch("http://155.248.245.165:8082/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Upload successful:", data);
  
      // Store extracted text
      setExtractedText(data.extracted_text || "No text extracted");
  
      // Store uploaded file details
      setUploadedFile(selectedFile);
      navigate("/", { state: { selectedFile, extractedText: data.extracted_text } });
    } catch (error) {
      console.error("Error uploading file:", error);
      setExtractedText("Error extracting text.");
    }
  };
  

  useEffect(() => {
    // Check if a file was passed from another route
    if (location.state && location.state.selectedFile) {
      setUploadedFile(location.state.selectedFile);
    }
  }, [location.state]);

  return (
    <main className="main-container d-flex flex-column align-items-center justify-content-center">
      {/* Full-width curved background */}
      <div className="curved-bg"></div>
      <div className="content-card text-center">
        <h2 className="content-title">Extract Pages from PDF Online</h2>
        <p className="content-subtitle">
          Get a new document containing only the desired pages.
        </p>

        <div className="cfile">
          <div className="btn-group">
          {/* {!uploadedFile && 
            <>
            <button className="btn btn-success upload-btn" type="button">
                <FaLaptop className="me-2" /> Upload PDF Files
              </button>
              <button className="btn btn-success dropdown-toggle dropdown-toggle-split"
              type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
            </>
          } */}

          <div className="file-upload-wrapper">
          {!isFileDialogOpen && ( // Hide button when file dialog is open
              <label htmlFor="file-upload" className="upload-label btn btn-primary">
                <FaLaptop className="me-2" /> Choose PDF File
              </label>
            )}
            <input id="file-upload" type="file" accept="application/pdf" className="file-input" onChange={handleFileChange} onClick={() => setIsFileDialogOpen(true)} onBlur={() => setIsFileDialogOpen(false)} />
          </div>

            {/* <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/upload/local")}
                >
                  <FaLaptop className="me-2 text-success" /> Local Computer
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/upload/google-drive")}
                >
                  <FaGoogleDrive className="me-2 text-primary" /> Google Drive
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/upload/dropbox")}
                >
                  <FaDropbox className="me-2 text-info" /> Dropbox
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/upload/onedrive")}
                >
                  <FaCloud className="me-2 text-primary" /> OneDrive
                </a>
              </li>
            </ul> */}
          </div>

          {/* File Details & Extract Text Button */}
          {uploadedFile && (
            <>
              <div className="file-details text-center mt-3">
                <p className="text-muted">
                  <strong>Selected File:</strong> {uploadedFile.name}
                </p>
                {/* <button className="btn btn-primary mt-3">Extract Text</button> */}
              </div>
            </>
          )}
        </div>

        {extractedText && (
          <>
            <h3 className="extracted-heading">Extracted Content</h3>
            <div className="extracted-text mt-4 p-3 border rounded bg-light">
              <pre className="text-start">{extractedText}</pre>
            </div>
          </>
        )}

        {/* Privacy Note */}
        {!isFileDialogOpen && (
          <>
            <p className="privacy-text">Files stay private. Automatically deleted after 2 hours.</p>
            <p className="terms">Free service for documents up to 200 pages or 50 MB and 3 tasks per hour. <a href="#" className="terms-link">Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default MainContent;
