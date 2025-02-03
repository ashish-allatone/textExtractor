import React, { useEffect } from "react";

const GoogleDriveUpload = () => {
  useEffect(() => {
    // Redirect to Google OAuth for Drive access
    window.location.href = "https://accounts.google.com/signin/v2/identifier?service=wise";
  }, []);

  return (
    <div className="upload-container">
      <h2>Redirecting to Google Drive...</h2>
      <p>If you are not redirected, <a href="https://accounts.google.com/signin/v2/identifier?service=wise">click here</a>.</p>
    </div>
  );
};

export default GoogleDriveUpload;
