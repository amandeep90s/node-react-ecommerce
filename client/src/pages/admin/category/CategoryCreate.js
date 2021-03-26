import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    createCategory,
    getCategories,
    removeCategory,
} from "../../../functions/category";
import { Spin } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import CategoryFrom from "../../../components/forms/CategoryForm";

const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadCategories();
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                if (error.response.status === 400)
                    toast.error(error.response.data);
            });
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Are you want to delete this category?")) {
            setLoading(true);

            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    setName("");
                    toast.success(`"${res.data.name}" is deleted`);
                    loadCategories();
                })
                .catch((error) => {
                    setLoading(false);
                    console.error(error);
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
                        <h4>Create Category</h4>
                    )}

                    <CategoryFrom
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        loading={loading}
                    />

                    <hr />

                    {categories.map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span
                                onClick={() => handleRemove(c.slug)}
                                className="btn btn-sm float-right text-danger py-0">
                                <DeleteOutlined />
                            </span>

                            <Link
                                to={`/admin/category/${c.slug}`}
                                className="float-right mr-3">
                                <span className="btn btn-sm float-right text-warning py-0">
                                    <EditOutlined />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
