import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);

        // redirect
        count === 0 && history.push("/");

        // cleanup
        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="container p-5 text-center">
            <div>
                <Spin indicator={<LoadingOutlined />} className="mr-2" />
                Redirecting you in {count} seconds
            </div>
        </div>
    );
};

export default LoadingToRedirect;
