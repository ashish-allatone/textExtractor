import React, { useEffect } from "react";

const OneDriveUpload = () => {
  useEffect(() => {
    // Redirect to Microsoft OAuth for OneDrive access
    window.location.href = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
  }, []);

  return (
    <div className="upload-container">
      <h2>Redirecting to OneDrive...</h2>
      <p>If you are not redirected, <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize">click here</a>.</p>
    </div>
  );
};

export default OneDriveUpload;
