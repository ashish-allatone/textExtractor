import React, { useState } from "react";
import frontImage from "../../assets/dummy-pan-card.png"
// import backImage from "../../assets/pan-back.png"
import "./panCard.css";

const PanCardUpload = () => {
    const [panFront, setPANFront] = useState(null);
    const [frontPreview, setFrontPreview] = useState(frontImage);
    const [extractedData, setExtractedData] = useState(null); // New state for extracted data
    const [details, setDetails] = useState(null); // New state for extracted data

    // Handle file selection
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === "front") {
                setPANFront(file);
                setFrontPreview(URL.createObjectURL(file)); // Update image preview
            } 
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!panFront) {
            alert("Please upload images of PAN card.");
            return;
        }
    
        const formDataFront = new FormData();
        formDataFront.append("file", panFront, "pan_front.jpg");
    
        try {
            // Sending both API requests in parallel
            const responseFront = await fetch("http://140.245.21.255:8087/extract_pan_info", {
                method: "POST",
                body: formDataFront,
            })
    
            const resultFront = await responseFront.json();
    
            console.log("Front Image Response:", resultFront);
            // console.log("Back Image Response:", resultBack);
            // console.log("Extracted Address:", resultBack.extracted_info.Address);
    
            if (responseFront.ok) {
                setExtractedData({
                    front: resultFront.extracted_info || "No data extracted from front image",
                });
                setDetails({
                    // getting information from api TO-DO
                    name: resultFront.extracted_info.name || "N/A",
                    dob: resultFront.extracted_info.dob || "N/A",
                    pan_number: resultFront.extracted_info.pan_number || "N/A",
                    father_name: resultFront.extracted_info.father_name || "N/A",
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
        <div className="pan-container">
            <div className="container">
                <div className="wraper-pan-box">
                    <div className="pan-upload-card text-center">
                        <h2 className="upload-title mb-2">Upload Pan Card</h2>
                        <div className="wraper-pan">
                            <div className="pan-front-img">
                                {/* <p className="pan-img-title">Front Image</p> */}
                                <div className="upload-btn-wrapper">
                                    <img src={frontPreview} alt="pan Front Preview" />
                                    <input type="file" name="front_image" onChange={(e) => handleFileChange(e, "front")} />
                                </div>
                            </div>
                            {/* <div className="pan-back-img">
                                <p className="pan-img-title">Back Image</p>
                                <div className="upload-btn-wrapper">
                                    <img src={backPreview} alt="pan Back Preview" />
                                    <input type="file" name="panBack" onChange={(e) => handleFileChange(e, "back")} />
                                </div>
                            </div> */}
                        </div>
                        <div className="wrape-submitBtn">
                            <button className="btn btnSbmit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                    {details && (
                        <div className="pan-upload-card">
                            <h2 className="upload-title mb-2">Pan Card Details</h2>
                            <div className="pan-extracted-content">
                                <div className="pan-title"><b>Name</b>: {details.name || "N/A"}</div>
                                <div className="pan-title"><b>Father's name</b>: {details.father_name || "N/A"}</div>
                                <div className="pan-title"><b>DOB</b>: {details.dob || "N/A"}</div>
                                <div className="pan-title"><b>Pan Number</b>: {details.pan_number || "N/A"}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PanCardUpload;
