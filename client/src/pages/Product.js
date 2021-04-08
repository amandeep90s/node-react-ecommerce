import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match }) => {
    const [product, setProduct] = useState({});

    const { slug } = match.params;

    useEffect(() => {
        const loadSingleProduct = () =>
            getProduct(slug).then((res) => setProduct(res.data));

        loadSingleProduct();
    }, [slug]);

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} />
            </div>

            <div className="row">
                <div className="col py-5 text-center">
                    <hr />
                    <h4>Related products</h4>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Product;
