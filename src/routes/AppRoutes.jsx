import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Campaign from "../pages/Campaign";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="campaigns" element={<Campaign />}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
