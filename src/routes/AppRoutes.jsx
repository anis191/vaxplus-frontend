import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import CampaignDetails from "../pages/CampaignDetails";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="campaigns" element={<Campaign />}/>
                <Route path="campaigns/:campaignId" element={<CampaignDetails />}/>
                {/* <Route path="test/:id" element={<Test />}/> */}
            </Route>
        </Routes>
    );
};

export default AppRoutes;
