import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <div onClick={() => setModalVisible(true)}>
                <StarOutlined className="text-danger" /> <br />
                {user ? "Leave rating" : "Login to leave rating"}
            </div>

            <Modal
                title="Leave tour rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success(
                        "Thanks for your review. It will appear soon."
                    );
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;
