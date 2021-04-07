import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    createSubCategory,
    getSubCategories,
    removeSubCategory,
} from "../../../functions/sub-category";
import { getCategories } from "../../../functions/category";
import { Spin } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import SubCategoryForm from "../../../components/forms/SubCategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    // Searching / Filtering
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCategories();
        loadSubCategories();
    }, []);

    // Categories
    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));
    // Sub Categories
    const loadSubCategories = () =>
        getSubCategories().then((c) => setSubCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSubCategory({ name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                setParent("");
                toast.success(`"${res.data.name}" is created`);
                loadSubCategories();
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                if (error.response.status === 400)
                    toast.error(error.response.data);
            });
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Are you want to delete this sub category?")) {
            setLoading(true);

            removeSubCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    setName("");
                    setParent("");
                    toast.success(`"${res.data.name}" is deleted`);
                    loadSubCategories();
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    if (error.response.status === 400)
                        toast.error(error.response.data);
                });
        }
    };

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                        <h4>Create Sub Category</h4>
                    )}

                    <div className="form-group">
                        <label htmlFor="category">Parent Category</label>
                        <select
                            id="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}
                            value={parent}
                            required
                        >
                            <option value="">Please select</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <SubCategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        parent={parent}
                        setName={setName}
                        loading={loading}
                    />

                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {subCategories.filter(searched(keyword)).map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span
                                onClick={() => handleRemove(c.slug)}
                                className="btn btn-sm float-right text-danger py-0"
                            >
                                <DeleteOutlined />
                            </span>

                            <Link
                                to={`/admin/sub-category/${c.slug}`}
                                className="float-right mr-3"
                            >
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

export default SubCategoryCreate;
