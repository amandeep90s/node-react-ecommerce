import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Tooltip } from "antd";
import laptop from "../../images/laptop.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const { title, description, images, price, slug } = product;

    // redux
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // create card array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            // save to localstorage
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");
            // add to redux
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

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
                    <Tooltip title={tooltip}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCartOutlined className="text-danger" />
                            <br />
                            Add To Cart
                        </div>
                    </Tooltip>,
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
