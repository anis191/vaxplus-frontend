// import CarouselSlide from "../components/Home/Carousel/CarouselSlide";
import CampaignList from "../components/Home/CampaignSection/CampaignList";
import HeroCarousel from "../components/Home/Carousel/HeroCarousel";
import SectionHeader from "../components/Home/SectionHeader";


const Home = () => {
    return (
        <div className="max-w-[1200px] mx-auto">
            <SectionHeader />
            <HeroCarousel />
            <CampaignList />
        </div>
    );
};

export default Home;