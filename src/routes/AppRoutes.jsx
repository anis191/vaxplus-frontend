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
import Doctors from "../pages/Doctors";
import DoctorDetail from "../pages/DoctorDetail";
import BookingDetails from "../components/Booking/BookingDetails";
import ApplicationForm from "../components/DoctorsApplication/ApplicationForm";
import DoctorApplications from "../pages/DoctorApplications";
import VaccineCard from "../components/Vaccines/VaccineDetail";
import VaccineTable from "../components/Vaccines/VaccinesList";
import VaccineForm from "../components/Vaccines/VaccineForm";
import Categories from "../pages/CategoriesList";
import CategoryForm from "../components/Dashboard/CategoryForm";
import CenterForm from "../components/Dashboard/CenterForm";
import CenterTable from "../pages/CentersList";
import PaymentHistory from "../pages/PaymentHistory";
import PatientProfilePage from "../pages/PatientProfilePage";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="campaigns" element={<Campaign />}/>
                <Route path="vaccines" element={<VaccineCard />}/>
                <Route path="campaigns/:campaignId" element={<CampaignDetails />}/>
                <Route path="doctors" element={<Doctors />}/>
                <Route path="doctors/:doctorId" element={<DoctorDetail />}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path="reset_password" element={<ResetPassword />}/>
                <Route path="activate/:uid/:token" element={<ActivateAccount />}/>
                <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />}/>
                {/* <Route path="test/:id" element={<Test />}/> */}
                <Route path="about" element={<AboutPage />}/>
                <Route path="contact" element={<ContactPage />}/>
            </Route>

            {/* Private Routes */}
            <Route path="dashboard" element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>}>
                <Route index element={<Dashboard />}/>
                <Route path="booked_dose" element={<RegistrationsDoses />}/>
                <Route path="vaccination_history" element={<VaccinationHistory />}/>
                <Route path="add/campaign" element={<CampaignForm />}/>
                <Route path="add/vaccine" element={<VaccineForm />}/>
                <Route path="add/category" element={<CategoryForm />}/>
                <Route path="add/center" element={<CenterForm />}/>
                <Route path="campaign/:id/update" element={<EditCampaign />}/>
                <Route path="booking_detail/:uuid" element={<BookingDetails />}/>
                {/* <Route path="payment/success" element={<PaymentSuccess />}/> */}
                <Route path="doctors_apply" element={<ApplicationForm />}/>
                <Route path="doctor_applications" element={<DoctorApplications />}/>
                <Route path="profile" element={<Profile />}/>
                <Route path="patient_profile" element={<PatientProfilePage />}/>
                <Route path="vaccines" element={<VaccineTable />}/>
                <Route path="categories" element={<Categories />}/>
                <Route path="centers" element={<CenterTable />}/>
                <Route path="payments" element={<PaymentHistory />}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
