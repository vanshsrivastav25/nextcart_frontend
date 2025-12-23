import React from "react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      <div className="pulse-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loading;
