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
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            setValues({ ...values, ...p.data });
            loadSubCategories(p.data.category._id);

            let arr = [];
            p.data.sub_categories.map((s) => arr.push(s._id));

            setArrayOfSubs((prev) => arr);
        });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            setCategories(c.data);
        });

    const loadSubCategories = (categoryId) => {
        getSubCategories(categoryId)
            .then((res) => {
                setSubOptions(res.data);
            })
            .catch((err) => {
                console.error(err);
                setValues({ ...values, sub_categories: [] });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.sub_categories = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.error);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();

        setValues({ ...values, sub_categories: [] });

        setSelectedCategory(e.target.value);

        loadSubCategories(e.target.value);

        if (values.category._id === e.target.value) {
            loadProduct();
        }

        setArrayOfSubs([]);
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

                    <div className="pb-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>

                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
