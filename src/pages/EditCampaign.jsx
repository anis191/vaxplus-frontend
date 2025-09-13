// import React from 'react';

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../services/api-client";
import AddCampaign from "../components/Campaigns/CampaignForm";

const EditCampaign = () => {
    const[campaign, setCampaign] = useState(null)
    const[doctors, setDoctors] = useState([])

    const {id} = useParams()
    useEffect(()=>{
        const fetchCampaign = async () => {
            try{
                const res = await apiClient.get(`/campaigns/${id}/`)
                setCampaign(res.data)
            }catch(err){console.log(err)}
        }
        const fetchCampaignDoctor = async () => {
            try{
                const res = await apiClient.get(`/campaigns/${id}/doctors/`)
                setDoctors(res.data)
            }catch(err){console.log(err)}
        }

        fetchCampaign()
        fetchCampaignDoctor()
    },[])
    return (
        <div>
            <AddCampaign campaign={campaign} cDoctors={doctors}/>
        </div>
    );
};

export default EditCampaign;