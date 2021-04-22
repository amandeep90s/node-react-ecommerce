import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Tabs, Tooltip } from "antd";
import _ from "lodash";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

// this is children  component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const { _id, title, images, description } = product;

    let history = useHistory();
    // redux
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
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

    const handleAddToWishlist = (e) => {
        e.preventDefault();

        if (user !== null && user.token) {
            addToWishlist(product._id, user.token).then((res) => {
                if (res.data.ok) {
                    toast.success("Added to wishlist");
                    history.push("/user/wishlist");
                }
            });
        } else {
            toast.error("You are not logged in!!");
        }
    };

    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images &&
                            images.map((i) => (
                                <img src={i.url} key={i.public_id} alt="" />
                            ))}
                    </Carousel>
                ) : (
                    <Card
                        cover={
                            <img
                                alt="Product Carousel"
                                src={Laptop}
                                className="mb-3 card-image"
                            />
                        }
                    ></Card>
                )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call us on xxxx xxx xxx to learn more about this
                        product.
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>

                {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                ) : (
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                )}

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a
                                href="/#"
                                onClick={handleAddToCart}
                                disabled={product.quantity < 1}
                            >
                                <ShoppingCartOutlined className="text-danger" />
                                <br />
                                {product.quantity < 1
                                    ? "Out of Stock"
                                    : "Add To Cart"}
                            </a>
                        </Tooltip>,
                        <a href="/#" onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" />
                            <br />
                            Add To Wishlist
                        </a>,
                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
