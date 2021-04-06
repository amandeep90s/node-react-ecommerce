import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

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

    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/remove-image`,
                { public_id },
                {
                    headers: {
                        authtoken: user ? user.token : "",
                    },
                }
            )
            .then(() => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="w-100 mb-3">
                {values.images && values.images.length
                    ? values.images.map((image) => (
                          <div
                              className="mr-3 d-inline-block"
                              key={image.public_id}
                          >
                              <Badge
                                  count="X"
                                  onClick={() =>
                                      handleImageRemove(image.public_id)
                                  }
                                  style={{ cursor: "pointer" }}
                              >
                                  <Avatar
                                      size={100}
                                      src={image.url}
                                      shape="square"
                                  />
                              </Badge>
                          </div>
                      ))
                    : ""}
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
