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
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard"
import PrivateRoute from "../components/PrivateRoute";
import RegistrationsDoses from "../components/Dashboard/RegistrationsDoses";
import VaccinationHistory from "../components/Dashboard/VaccinationHistory";
import CampaignForm from "../components/Campaigns/CampaignForm";
import EditCampaign from "../pages/EditCampaign";
import Profile from "../pages/Profile";

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

            {/* Private Routes */}
            <Route path="dashboard" element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>}>
                <Route index element={<Dashboard />}/>
                <Route path="booked_dose" element={<RegistrationsDoses />}/>
                {/* <Route path="profile" element={<Profile />}/> */}
                <Route path="vaccination_history" element={<VaccinationHistory />}/>
                <Route path="add/campaign" element={<CampaignForm />}/>
                <Route path="campaign/:id/update" element={<EditCampaign />}/>
                {/* <Route path="payment/success" element={<PaymentSuccess />}/> */}
                {/* <Route path="products/add" element={<AddProduct />}/> */}
                <Route path="profile" element={<Profile />}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
