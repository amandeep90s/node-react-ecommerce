import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProduct, getRelated, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);

    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    const loadSingleProduct = useCallback(
        () =>
            getProduct(slug).then((res) => {
                setProduct(res.data);
                getRelated(res.data._id).then((res) => setRelated(res.data));
            }),
        [slug]
    );

    useEffect(() => {
        loadSingleProduct();
    }, [slug, loadSingleProduct]);

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (element) => element.postedBy.toString() === user._id.toString()
            );

            existingRatingObject && setStar(existingRatingObject.star);
        }
    }, [product.ratings, user]);

    const onStarClick = (newRating, name) => {
        setStar(newRating);

        productStar(name, newRating, user.token).then((res) => {
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row pt-4">
                    <SingleProduct
                        product={product}
                        onStarClick={onStarClick}
                        star={star}
                    />
                </div>

                <div className="row">
                    <div className="col py-5 text-center">
                        <hr />
                        <h4>Related products</h4>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row pb-5">
                    {related.length ? (
                        related.map((r) => (
                            <div className="col-md-3" key={r._id}>
                                <ProductCard product={r} />
                            </div>
                        ))
                    ) : (
                        <div className="col text-center">No products found</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Product;
