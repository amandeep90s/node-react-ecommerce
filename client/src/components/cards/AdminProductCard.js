import React from "react";
import { Card } from "antd";

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
                    src={
                        images && images.length
                            ? images[0].url
                            : "https://via.placeholder.com/150"
                    }
                    style={{ height: "150px", objectFit: "cover" }}
                    className="img-fluid p-2"
                />
            }
        >
            <Meta title={title} description={description} />
        </Card>
    );
};

export default AdminProductCard;
