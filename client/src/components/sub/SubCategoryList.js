import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/sub-category";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SubCategoryList = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getSubCategories().then((c) => {
            setSubCategories(c.data);
            setLoading(false);
        });
    }, []);

    const showSubCategories = () =>
        subCategories.map((s) => (
            <div
                key={s._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            >
                <Link to={`/sub-category/${s.slug}`}>{s.name}</Link>
            </div>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <h4 className="text-center">
                        <Spin
                            indicator={<LoadingOutlined />}
                            className="mr-2"
                        />
                        Loading...
                    </h4>
                ) : (
                    showSubCategories()
                )}
            </div>
        </div>
    );
};

export default SubCategoryList;
