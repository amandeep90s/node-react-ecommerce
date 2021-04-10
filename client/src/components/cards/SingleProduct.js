import React from "react";
import { Link } from "react-router-dom";
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
    const { _id, title, images, description } = product;

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

                <StarRating
                    name={_id}
                    numberOfStars={5}
                    rating={2}
                    changeRating={(newRating, name) =>
                        console.log(newRating, name)
                    }
                    isSelectable={true}
                    starRatedColor="red"
                />

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
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
