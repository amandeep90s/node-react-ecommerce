import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);

    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (element) => element.postedBy.toString() === user._id.toString()
            );

            existingRatingObject && setStar(existingRatingObject.star);
        }
    }, [product.ratings, user]);

    const loadSingleProduct = () =>
        getProduct(slug).then((res) => setProduct(res.data));

    const onStarClick = (newRating, name) => {
        setStar(newRating);

        productStar(name, newRating, user.token).then((res) => {
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    };

    return (
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
    );
};

export default Product;
