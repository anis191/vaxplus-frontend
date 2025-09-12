// import React from 'react';

import { useEffect } from "react";
import apiClient from "../services/api-client";
import { useParams } from "react-router";

const Test = () => {
    const {id} = useParams()
    useEffect(()=>{
        const cam = async()=>{
            try{
                const response = await apiClient.get(`/campaigns/${id}/`)
                console.log(response)
            }catch(e){console.log(e)}
        }
        cam()
    },[])
    return (
        <div>
            
        </div>
    );
};

export default Test;