import React, { useState } from "react";
import frontImage from "../../assets/aadhar-front.png"
import backImage from "../../assets/aadhar-back.png"
import "./aadharCard.css";

const AadharCardUpload = () => {
    const [aadharFront, setAadharFront] = useState(null);
    const [aadharBack, setAadharBack] = useState(null);
    const [frontPreview, setFrontPreview] = useState(frontImage);
    const [backPreview, setBackPreview] = useState(backImage);
    const [extractedData, setExtractedData] = useState(null); // New state for extracted data
    const [details, setDetails] = useState(null); // New state for extracted data

    // Handle file selection
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === "front") {
                setAadharFront(file);
                setFrontPreview(URL.createObjectURL(file)); // Update image preview
            } else {
                setAadharBack(file);
                setBackPreview(URL.createObjectURL(file)); // Update image preview
            }
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!aadharFront || !aadharBack) {
            alert("Please upload both front and back images of Aadhar card.");
            return;
        }
    
        const formDataFront = new FormData();
        formDataFront.append("front_image", aadharFront, "aadhar_front.jpg");
    
        const formDataBack = new FormData();
        formDataBack.append("file", aadharBack, "aadhar_back.jpg");
    
        try {
            // Sending both API requests in parallel
            const [responseFront, responseBack] = await Promise.all([
                fetch("http://140.245.21.255:8084/upload_image", {
                    method: "POST",
                    body: formDataFront,
                }),
                fetch("http://140.245.21.255:8086/extract", {
                    method: "POST",
                    body: formDataBack,
                }),
                fetch("http://140.245.21.255:8085/upload_image", {
                    method: "POST",
                    body: formDataBack,
                }),
            ]);
    
            const resultFront = await responseFront.json();
            const resultBack = await responseBack.json();
    
            console.log("Front Image Response:", resultFront);
            console.log("Back Image Response:", resultBack);
            console.log("Extracted Address:", resultBack.extracted_info.Address);
    
            if (responseFront.ok && responseBack.ok) {
                setExtractedData({
                    front: resultFront.extracted_text || "No data extracted from front image",
                    back: resultBack.extracted_text || "No data extracted from back image",
                });
    
                setDetails({
                    name: resultFront.details?.name || resultBack.details?.name || "N/A",
                    dob: resultFront.details?.dob || resultBack.details?.dob || "N/A",
                    gender: resultFront.details?.gender || resultBack.details?.gender || "N/A",
                    aadhaar_number: resultFront.details?.aadhaar_number || resultBack.extracted_info?.aadhaar_number || "N/A",
                    address: resultBack.Address || "N/A",
                    Son_Daughter_of: resultBack.extracted_info?.Son_Daughter_of || "N/A",
                });
            } else {
                alert("Upload successful, but no data extracted.");
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("An error occurred. Please try again.");
        }
    };
    
    
    return (
        <div className="aadhar-container">
            <div className="container">
                <div className="wraper-aadhar-box">
                    <div className="aadhar-upload-card">
                        <h2 className="upload-title mb-2">Upload Aadhar Card</h2>
                        <div className="wraper-aadhar">
                            <div className="aadhar-front-img">
                                <p className="aadhar-img-title">Front Image</p>
                                <div className="upload-btn-wrapper">
                                    <img src={frontPreview} alt="Aadhar Front Preview" />
                                    <input type="file" name="front_image" onChange={(e) => handleFileChange(e, "front")} />
                                </div>
                            </div>
                            <div className="aadhar-back-img">
                                <p className="aadhar-img-title">Back Image</p>
                                <div className="upload-btn-wrapper">
                                    <img src={backPreview} alt="Aadhar Back Preview" />
                                    <input type="file" name="aadharBack" onChange={(e) => handleFileChange(e, "back")} />
                                </div>
                            </div>
                        </div>
                        <div className="wrape-submitBtn">
                            <button className="btn btnSbmit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                    {details && (
                        <div className="aadhar-upload-card">
                            <h2 className="upload-title mb-2">Aadhar Card Details</h2>
                            <div className="aadhar-extracted-content">
                                <div className="aadhar-title"><b>Name</b>: {details.name || "N/A"}</div>
                                {/* <div className="aadhar-title"><b>Father's name</b>: {details.Son_Daughter_of || "N/A"}</div> */}
                                <div className="aadhar-title"><b>DOB</b>: {details.dob || "N/A"}</div>
                                <div className="aadhar-title"><b>Gender</b>: {details.gender || "N/A"}</div>
                                <div className="aadhar-title"><b>Aadhar Number</b>: {details.aadhaar_number || "N/A"}</div>
                                <div className="aadhar-title"><b>Address</b>: {details.address || "N/A"}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AadharCardUpload;
