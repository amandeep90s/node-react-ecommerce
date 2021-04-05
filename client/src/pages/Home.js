import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import Jumbotron from "../components/cards/Jumbotron";

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
                setLoading(false);
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
                {loading ? (
                    <LoadingCard count={4} />
                ) : (
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-3">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
