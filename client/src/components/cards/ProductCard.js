import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { title, description, images, price, slug } = product;

    return (
        <>
            {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
            ) : (
                <div className="text-center pt-1 pb-3">No rating yet</div>
            )}

            <Card
                hoverable
                style={{ width: 240 }}
                cover={
                    <img
                        alt="Product"
                        src={images && images.length ? images[0].url : laptop}
                        style={{ height: "160px", objectFit: "cover" }}
                        className="img-fluid p-2"
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View
                        Product
                    </Link>,
                    <>
                        <ShoppingCartOutlined className="text-danger" /> <br />{" "}
                        Add To Cart
                    </>,
                ]}
            >
                <Meta
                    title={`${title}`}
                    description={`${
                        description && description.substring(0, 25)
                    }...`}
                />
                <p className="mt-2 mb-0 text-muted">Price - ${price}</p>
            </Card>
        </>
    );
};

export default ProductCard;
