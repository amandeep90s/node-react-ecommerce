import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadAllProducts = () => {
            setLoading(true);
            // sort, order, page
            getProducts("sold", "desc", page).then((res) => {
                setProducts(res.data);
                setLoading(false);
            });
        };

        loadAllProducts();

        return () => {
            setProducts([]);
        };
    }, [page]);

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data));
    }, []);

    return (
        <>
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
                <div className="row">
                    <div className="col-md-12 text-center pt-4">
                        <Pagination
                            current={page}
                            total={(productsCount / 4) * 10}
                            onChange={(value) => setPage(value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BestSellers;
