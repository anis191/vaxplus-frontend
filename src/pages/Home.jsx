import CampaignList from "../components/Home/CampaignSection/CampaignList";
import HeroCarousel from "../components/Home/Carousel/HeroCarousel";
import Steps from "../components/Home/ProcessFlow/Steps";
import SectionHeader from "../components/Home/SectionHeader";
import Slider from "../components/Home/DoctorSection/Slider"
import Statistics from "../components/Home/Statistics";
import Donation from "../components/Home/Donation"
import Faq from "../components/Home/Faq"

const Home = () => {
    return (
        <div className="max-w-[1200px] mx-auto">
            <SectionHeader />
            <HeroCarousel />
            <hr className="my-4 border-t-2 border-gray-200" />
            <CampaignList />
            <hr className="my-4 border-t-2 border-gray-200" />
            <Steps />
            <Statistics />
            <hr className="my-8 border-t-2 border-gray-200" />
            <Slider />
            <hr className="my-8 border-t-2 border-gray-200" />
            <Donation />
            <hr className="my-8 border-t-2 border-gray-200" />
            <Faq />
        </div>
    );
};

export default Home;