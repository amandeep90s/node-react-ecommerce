import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    const { title, description, images } = product;
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={
                <img
                    alt="Product"
                    src={images && images.length ? images[0].url : laptop}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="img-fluid p-2"
                />
            }
            actions={[
                <EditOutlined className="text-warning" />,
                <DeleteOutlined className="text-danger" />,
            ]}
        >
            <Meta
                title={title}
                description={`${
                    description && description.substring(0, 28)
                }...`}
            />
        </Card>
    );
};

export default AdminProductCard;
