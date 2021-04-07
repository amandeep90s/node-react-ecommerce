import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../functions/category";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import CategoryFrom from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    let { slug } = useParams();

    useEffect(() => {
        loadCategory(slug);
    }, [slug]);

    const loadCategory = (slug) =>
        getCategory(slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push("/admin/category");
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
                        <h4>Update Category</h4>
                    )}

                    <CategoryFrom
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;
