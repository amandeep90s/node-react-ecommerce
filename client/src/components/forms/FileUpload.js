import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {
        let files = e.target.files;

        if (files) {
            for (let index = 0; index < files.length; index++) {
                Resizer.imageFileResizer(
                    files[index],
                    720,
                    720,
                    "WEBP",
                    100,
                    0,
                    (uri) => {
                        console.log(uri);
                    },
                    "base64"
                );
            }
        }
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
