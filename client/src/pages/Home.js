import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";

const Home = () => {
    return (
        <div className="pb-5">
            <div className="jumbotron text-danger text-center h1 font-weight-bold">
                <Jumbotron
                    text={["Latest Products", "New Arrivals", "Best Sellers"]}
                />
            </div>

            <div className="text-center p-3 my-5 display-4 jumbotron">
                New Arrivals
            </div>

            <NewArrivals />

            <div className="text-center p-3 my-5 display-4 jumbotron">
                Best Sellers
            </div>

            <BestSellers />

            <div className="text-center p-3 my-5 display-4 jumbotron">
                Categories
            </div>

            <CategoryList />
        </div>
    );
};

export default Home;
