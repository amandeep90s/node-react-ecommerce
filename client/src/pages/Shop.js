import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProuctsByFilter, getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
    }, []);

    // load products by default on page load
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    // load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300);

        return () => clearTimeout(delayed);
    }, [text]);

    const fetchProducts = (arg) => {
        setLoading(true);
        fetchProuctsByFilter(arg).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-3">Search filter</div>

                <div className="col-md-9">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            ></Spin>
                            ...Loading
                        </h4>
                    ) : (
                        <h4>Products</h4>
                    )}

                    {products.length < 1 && <p>No Products Found</p>}

                    <div className="row pb-5">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
