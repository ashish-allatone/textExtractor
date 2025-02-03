import React, { useEffect } from "react";

const DropboxUpload = () => {
  useEffect(() => {
    // Redirect to Dropbox OAuth for file upload access
    window.location.href = "https://www.dropbox.com/oauth2/authorize";
  }, []);

  return (
    <div className="upload-container">
      <h2>Redirecting to Dropbox...</h2>
      <p>If you are not redirected, <a href="https://www.dropbox.com/oauth2/authorize">click here</a>.</p>
    </div>
  );
};

export default DropboxUpload;
