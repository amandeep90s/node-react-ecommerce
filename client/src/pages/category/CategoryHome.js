import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((c) => {
            setCategory(c.data.category);
            setProducts(c.data.products);
            setLoading(false);
        });
    }, [slug]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h4 className="text-center p-3 mt-5 display-4 jumbotron">
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            />
                            ...Loading
                        </h4>
                    ) : (
                        <h4 className="text-center p-3 mt-5 display-4 jumbotron">
                            {products.length} Products in "{category.name}"
                        </h4>
                    )}
                </div>
            </div>

            <div className="row">
                {products.map((p) => (
                    <div className="col-md-3" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryHome;
