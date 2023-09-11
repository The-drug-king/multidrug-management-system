import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PostPage.css";

function PatientPost() {
  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleFileChange = (e) => {
    encodeFileToBase64(e.target.files[0]);
  };

  return (
    <div className="center-container">
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
      <div>
        <label className="custom-file-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          Upload Image
        </label>
        <Link to="/patient/result">
          {" "}
          <button className="custom-file-upload">분석 시작</button>
        </Link>
      </div>
    </div>
  );
}

export default PatientPost;
