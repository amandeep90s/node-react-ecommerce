import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { title, description, images, slug } = product;

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
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-warning" /> <br /> View Product
                </Link>,
                <>
                    <ShoppingCartOutlined className="text-danger" /> <br /> Add
                    To Cart
                </>,
            ]}
        >
            <Meta
                title={title}
                description={`${
                    description && description.substring(0, 25)
                }...`}
            />
        </Card>
    );
};

export default ProductCard;
