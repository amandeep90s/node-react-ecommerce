import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((c) => {
            setCategory(c.data);
            setLoading(false);
        });
    }, [slug]);

    return <div>{match.params.slug}</div>;
};

export default CategoryHome;
