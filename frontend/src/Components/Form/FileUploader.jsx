import React from "react";

const FileUploader = (props) => {
  const handleFileInput = (e) => {
    if (e.target) {
      console.log(e.target.files[0]);
      const attachement = e.target.files[0];
      props.setSelectedFile(attachement);
    }
  };

  return (
      <input
        value={props.attachement}
        type="file"
        id="attachement"
        name="attachement"
        onChange={handleFileInput}
      />
  );
};

export default FileUploader;
