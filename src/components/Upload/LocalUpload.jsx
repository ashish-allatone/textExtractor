import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LocalUpload.css";

const LocalUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Redirect to the home page with the selected file as state
      navigate("/", { state: { selectedFile } });
    }
  };

  return (
    <div className="upload-container d-flex align-items-center justify-content-center">
      <div className="upload-card shadow-lg text-center p-4">
        <h2 className="upload-title mb-3">Upload from Local Computer</h2>
        <p className="upload-description text-muted mb-4">
          Select a PDF file from your computer to extract text effortlessly.
        </p>

        <div className="file-upload-wrapper">
          <label htmlFor="file-upload" className="upload-label btn btn-primary mb-3">
            Choose PDF File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>

        <p className="upload-note text-muted">
          Supported formats: <span className="text-primary">PDF</span>
        </p>
      </div>
    </div>
  );
};

export default LocalUpload;

