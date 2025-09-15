// import React from 'react';

import Review from "../Reviews/Review";

const Reviews = ({campaignId}) => {
    return (
        <>
        <h2 className="text-2xl font-extrabold text-gray-900">Reviews</h2>
        <p className="pt-4 text-gray-500">All Campaign Reviews</p>
        <Review campaignId={campaignId}/>
        </>
    );
};

export default Reviews;