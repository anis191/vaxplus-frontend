import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import CampaignDetails from "../pages/CampaignDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import ActivateAccount from "../components/Registration/ActivateAccount";
import ResetPasswordConfirm from "../components/Registration/ResetPasswordConfirm";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="campaigns" element={<Campaign />}/>
                <Route path="campaigns/:campaignId" element={<CampaignDetails />}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path="reset_password" element={<ResetPassword />}/>
                <Route path="activate/:uid/:token" element={<ActivateAccount />}/>
                <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />}/>
                {/* <Route path="test/:id" element={<Test />}/> */}
            </Route>
        </Routes>
    );
};

export default AppRoutes;
