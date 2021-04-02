import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount } from "../../functions/product";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const AdminDashboard = () => {
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
                console.error(error);
            });
    };

    return (
        <div className="container-fluid py-2">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            />
                            Loading...
                        </h4>
                    ) : (
                        <h4>Admin Dashboard</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
