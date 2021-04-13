import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProuctsByFilter, getProductsByCount } from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubCategories } from "../functions/sub-category";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox, Menu, Slider, Spin } from "antd";
import {
    DollarOutlined,
    DownSquareOutlined,
    LoadingOutlined,
    StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState([0, 0]);
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setSubCategory] = useState("");

    let dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch sub-categories
        getSubCategories().then((res) => setSubCategories(res.data));
    }, []);

    // getting products
    const fetchProducts = (arg) => {
        setLoading(true);
        fetchProuctsByFilter(arg).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    // 1. load products by default on page load
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            if (text.length > 0) {
                fetchProducts({ query: text });
            }
        }, 500);

        return () => clearTimeout(delayed);
    }, [text]);

    // 3. load products based on price range
    useEffect(() => {
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });

        // reset
        setCategoryIds([]);
        setPrice(value);
        setStar("");
        setSubCategory("");
        setTimeout(() => {
            setOk(!ok);
        }, 500);
    };

    // 4. load products based on category
    const showCategories = () =>
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

    // handle check for categories
    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setStar("");
        setSubCategory("");

        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        fetchProducts({ category: inTheState });
    };

    // 5. products by star rating
    const handleStarClick = (number) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(number);
        setSubCategory("");
        fetchProducts({ stars: number });
    };

    const showStars = () => (
        <div className="px-4 pb-2">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    );

    // 6. products by sub categories
    const showSubCategories = () =>
        subCategories.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSub(s)}
                style={{ cursor: "pointer" }}
                className="p-1 m-1 badge badge-secondary"
            >
                {s.name}
            </div>
        ));

    const handleSub = (sub) => {
        setSubCategory(sub);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        fetchProducts({ sub });
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-3">
                    <h4>Search/Filter</h4>
                    <hr />
                    <Menu
                        defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
                        mode="inline"
                    >
                        {/* Price */}
                        <SubMenu
                            key="1"
                            title={
                                <span className="h6">
                                    <DollarOutlined /> Price
                                </span>
                            }
                        >
                            <div>
                                <Slider
                                    className="mx-4"
                                    tipFormatter={(v) => `$${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max="4999"
                                />
                            </div>
                        </SubMenu>
                        {/* Category */}
                        <SubMenu
                            key="2"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Categories
                                </span>
                            }
                        >
                            <div>{showCategories()}</div>
                        </SubMenu>
                        {/* Stars */}
                        <SubMenu
                            key="3"
                            title={
                                <span className="h6">
                                    <StarOutlined /> Rating
                                </span>
                            }
                        >
                            <div>{showStars()}</div>
                        </SubMenu>
                        {/* Sub Categories */}
                        <SubMenu
                            key="4"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Sub Categories
                                </span>
                            }
                        >
                            <div className="px-4">{showSubCategories()}</div>
                        </SubMenu>
                    </Menu>
                </div>

                <div className="col-md-9">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            ></Spin>
                            ...Loading
                        </h4>
                    ) : (
                        <h4>Products</h4>
                    )}

                    {products.length < 1 && <p>No Products Found</p>}

                    <div className="row pb-5">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
