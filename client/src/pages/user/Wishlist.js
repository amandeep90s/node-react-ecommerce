import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeFromWishlist } from "../../functions/user";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const loadWishlists = useCallback(() => {
        setLoading(true);
        getWishlist(user.token).then((res) => {
            setWishlist(res.data.wishlist);
            setLoading(false);
        });
    }, [user.token]);

    useEffect(() => {
        loadWishlists();
    }, [loadWishlists]);

    const handleRemove = (productId) => {
        setLoading(true);
        removeFromWishlist(productId, user.token).then((res) => {
            if (res.data.ok) {
                toast.success("Removed from wishlist");
                setLoading(false);
                loadWishlists();
            }
        });
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            />
                            Loading...
                        </h4>
                    ) : (
                        <h4>User wishlist</h4>
                    )}

                    {wishlist.map((p) => (
                        <div key={p._id} className="alert alert-secondary">
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>

                            <span
                                className="btn btn-sm float-right p-0"
                                onClick={() => handleRemove(p._id)}
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
