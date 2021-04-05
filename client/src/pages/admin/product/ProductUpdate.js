import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategories, getSubCategories } from "../../../functions/category";
import { getProduct, updateProduct } from "../../../functions/product";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title: "",
    description: "",
    price: "",
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

const ProductUpdate = ({ match, history }) => {
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(true);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        const loadCategories = () =>
            getCategories().then((c) => setCategories(c.data));

        loadCategories();

        const loadProduct = (slug) => {
            getProduct(slug).then((p) => {
                setValues({ ...values, ...p.data });
            });
        };

        loadProduct(slug);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateProduct(slug, values, user.token)
            .then(() => {
                toast.success(`"${values.title}" updated successfully.`);
                setLoading(false);
                history.push("/admin/products");
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

    const handleCategoryChange = (e) => {
        e.preventDefault();
        setValues({ ...values, sub_categories: [], category: e.target.value });
        getSubCategories(e.target.value)
            .then((res) => {
                setSubOptions(res.data);
                setShowSub(true);
            })
            .catch((err) => {
                console.error(err);
                setValues({ ...values, sub_categories: [] });
                setShowSub(false);
            });
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
                        <h4>Update Product</h4>
                    )}
                    <hr />

                    {/* <div className="pb-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div> */}

                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        setValues={setValues}
                        values={values}
                        showSub={showSub}
                        subOptions={subOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
