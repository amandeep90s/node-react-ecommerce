import React from "react";

const FileUpload = () => {
    const fileUploadAndResize = (e) => {
        //
    };

    return (
        <div className="">
            <label className="btn btn-primary btn-raised">
                Choose File
                <input
                    type="file"
                    hidden
                    multiple
                    accept="images/*"
                    onChange={fileUploadAndResize}
                />
            </label>
        </div>
    );
};

export default FileUpload;
