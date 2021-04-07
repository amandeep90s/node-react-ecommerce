import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { toast } from "react-toastify";

const AllProducts = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(10)
            .then((res) => {
                setLoading(false);
                setProducts(res.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const handleRemove = (slug) => {
        let answer = window.confirm("Are you sure ?");
        if (answer) {
            setLoading(true);
            removeProduct(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.success(`${res.data.title} deleted successfully`);
                    loadAllProducts();
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    if (error.response.status === 400)
                        toast.error(error.response.data);
                });
        }
    };

    return (
        <div className="container-fluid py-2">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            />
                            Loading...
                        </h4>
                    ) : (
                        <h4>All Products</h4>
                    )}
                    <hr />
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-3 mb-3" key={product._id}>
                                <AdminProductCard
                                    product={product}
                                    handleRemove={handleRemove}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
