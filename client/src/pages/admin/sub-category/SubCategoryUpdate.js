import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    getSubCategory,
    updateSubCategory,
} from "../../../functions/sub-category";
import { getCategories } from "../../../functions/category";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import CategoryFrom from "../../../components/forms/SubCategoryForm";

const SubCategoryUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    let { slug } = useParams();

    useEffect(() => {
        loadCategories();
        loadSubCategory(slug);
    }, [slug]);

    // Categories
    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubCategory = (slug) =>
        getSubCategory(slug).then((c) => {
            setName(c.data.name);
            setParent(c.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSubCategory(slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push("/admin/sub-category");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                if (error.response.status === 400)
                    toast.error(error.response.data);
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
                        <h4>Update Sub Category</h4>
                    )}

                    <div className="form-group">
                        <label htmlFor="category">Parent Category</label>
                        <select
                            id="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}
                            required
                            value={parent}
                        >
                            <option value="" disabled>
                                Please select
                            </option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <CategoryFrom
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        parent={parent}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubCategoryUpdate;
