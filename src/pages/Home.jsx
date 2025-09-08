import CampaignList from "../components/Home/CampaignSection/CampaignList";
import HeroCarousel from "../components/Home/Carousel/HeroCarousel";
import Steps from "../components/Home/ProcessFlow/Steps";
import SectionHeader from "../components/Home/SectionHeader";

const Home = () => {
    return (
        <div className="max-w-[1200px] mx-auto">
            <SectionHeader />
            <HeroCarousel />
            <CampaignList />
            <Steps />
        </div>
    );
};

export default Home;