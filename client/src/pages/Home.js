import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(3)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return (
        <>
            <div className="jumbotron text-danger text-center h1 font-weight-bold">
                <Jumbotron
                    text={["Latest Products", "New Arrivals", "Best Sellers"]}
                />
            </div>
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-3 mb-3" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
