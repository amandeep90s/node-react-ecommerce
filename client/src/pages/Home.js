import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";

const Home = () => {
    return (
        <>
            <div className="jumbotron text-danger text-center h1 font-weight-bold">
                <Jumbotron
                    text={["Latest Products", "New Arrivals", "Best Sellers"]}
                />
            </div>

            <div className="text-center p-3 my-5 display-4 jumbotron">
                New Arrivals
            </div>

            <NewArrivals />
        </>
    );
};

export default Home;
