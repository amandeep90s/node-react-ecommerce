import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import {
    HeartOutlined,
    ShoppingCartOutlined,
    StarOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
    const { title, description, images, slug } = product;

    return (
        <>
            <div className="col-md-7"></div>
            <div className="col-md-5">
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" />
                            <br />
                            Add To Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" />
                            <br />
                            Add To Wishlist
                        </Link>,
                        <Link to="/">
                            <StarOutlined className="text-danger" />
                            <br />
                            Login to Leave Rating
                        </Link>,
                    ]}
                >
                    <Meta title={title} description={description} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
