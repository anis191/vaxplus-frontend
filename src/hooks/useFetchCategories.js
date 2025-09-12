// import React from 'react';

const useFetchCategories = () => {
    return (
        <div>
            
        </div>
    );
};

export default useFetchCategories;

// import { useEffect, useState } from "react";
// import apiClient from "../services/api-client";

// const useFetchCategories = () => {
//     const[categories, setCategories] = useState([])
//     const[err, setError] = useState("")

//     useEffect(() => {
//         const fetchCategory = async () => {
//             const url = `/categories/`
//             try{
//                 const response = await apiClient.get(url)
//                 const data = await response.data
//                 setCategories(data)
//             }catch(err){
//                 setError(err)
//             }
//         }
//         fetchCategory()
//     },[])
//     return{
//         categories, err
//     }
// };

// export default useFetchCategories;