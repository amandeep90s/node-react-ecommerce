import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
    const cards = () => {
        let totalCards = [];

        for (let index = 0; index < count; index++) {
            totalCards.push(
                <div className="col-md-3" key={index}>
                    <Card>
                        <Skeleton active></Skeleton>
                    </Card>
                </div>
            );
        }

        return totalCards;
    };

    return <div className="row">{cards()}</div>;
};

export default LoadingCard;
