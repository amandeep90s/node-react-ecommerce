import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
// import LocalSearch from "../../../components/forms/LocalSearch";

const initialState = {
    title: "Macbook PRO",
    description: "This is the best apple product",
    price: "45000",
    categories: [],
    category: "",
    sub_categories: [],
    shipping: "Yes",
    quantity: "50",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Microsoft", "Apple", "Dell", "Lenovo", "Asus"],
    color: "White",
    brand: "Apple",
};
const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            "true";
        };
    }, []);

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct(values, user.token)
            .then(() => {
                toast.success(`"${values.title}" create successfully.`);
                setValues({
                    ...values,
                    title: "",
                    description: "",
                    price: "",
                    categories: [],
                    category: "",
                    sub_categories: [],
                    shipping: "",
                    quantity: "",
                    images: [],
                    color: "",
                    brand: "",
                });

                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                toast.error(error.response.data.error);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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
                        <h4>Create Product</h4>
                    )}
                    <hr />

                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
