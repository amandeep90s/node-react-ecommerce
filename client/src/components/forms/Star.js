import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars, starColor }) => (
    <>
        <StarRating
            changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            starDimension="20px"
            starSpacing="2px"
            starHoverColor={starColor}
            starEmptyColor={starColor}
        />
        <br />
    </>
);

export default Star;
