import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true);

            for (let index = 0; index < files.length; index++) {
                Resizer.imageFileResizer(
                    files[index],
                    720,
                    720,
                    "WEBP",
                    100,
                    0,
                    (uri) => {
                        axios
                            .post(
                                `${process.env.REACT_APP_API_URL}/upload-images`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                console.log("image data", res);
                                setLoading(false);
                                allUploadedFiles.push(res.data);
                                setValues({
                                    ...values,
                                    images: allUploadedFiles,
                                });
                            })
                            .catch((err) => {
                                setLoading(false);
                                console.error(err);
                            });
                    },
                    "base64"
                );
            }
        }
    };

    return (
        <>
            <div className="w-100">
                {values.images &&
                    values.images.map((image) => (
                        <Avatar
                            key={image.public_id}
                            size={100}
                            src={image.url}
                            className="m-3"
                        />
                    ))}
            </div>

            <div className="w-100">
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
        </>
    );
};

export default FileUpload;
