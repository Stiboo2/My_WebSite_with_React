import React from "react";
import "./Title.css";
//import "../Categories/Socials.css";
const Title = ({ text }) => {
  return (
    <div className="title">
      <h2>{text || "Default Title"}</h2>
      <div className="title-underline"></div>
      <h2 className="title_h2">{"Branch"}</h2>
    </div>
  );
};

export default Title;
