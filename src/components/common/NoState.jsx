import React from "react";

const NoState = ({ text = "Record not found." }) => {
  return (
    <div className="text-center py-4 text-muted">
      {text}
    </div>
  );
};

export default NoState;
