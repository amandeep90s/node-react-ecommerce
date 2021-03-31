import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LayoutOutlined, LoadingOutlined } from "@ant-design/icons";
import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import LocalSearch from "../../../components/forms/LocalSearch";

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    sub_categories: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Microsoft", "Apple", "Dell", "Lenovo", "Asus"],
    color: "",
    brand: "",
};
const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const {
        title,
        description,
        price,
        categories,
        category,
        sub_categories,
        shipping,
        quantity,
        images,
        colors,
        color,
        brands,
        brand,
    } = values;

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                if (error.response.status === 400) {
                    toast.error(error.response.data);
                }
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
                                indicator={<LayoutOutlined />}
                                className="mr-2"
                            />
                            Loading...
                        </h4>
                    ) : (
                        <h4>Create Product</h4>
                    )}
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-control"
                                value={values.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                className="form-control"
                                value={values.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="form-control"
                                value={values.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="shipping">Shipping</label>
                            <select
                                name="shipping"
                                id="shipping"
                                className="form-control"
                                onChange={handleChange}
                                value={shipping}>
                                <option value="">Select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="form-control"
                                value={values.quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <select
                                name="color"
                                id="color"
                                className="form-control"
                                onChange={handleChange}
                                value={color}>
                                <option value="">Please Select</option>
                                {colors.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <select
                                name="brand"
                                id="brand"
                                className="form-control"
                                onChange={handleChange}
                                value={brand}>
                                <option value="">Please Select</option>
                                {brands.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-raised">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
