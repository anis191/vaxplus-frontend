// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselSlide from "./CarouselSlide";
import banner2 from "../../../assets/images/bannerImage2.jpg"
import banner3 from "../../../assets/images/CRI1.jpg"
import banner4 from "../../../assets/images/CRSI1.jpg"

const HeroCarousel = () => {
    const slides = [
        {
            title : "Seasonal Flu Shots – Protect Yourself and Others",
            subtitle : "Annual flu vaccines are the best way to prevent influenza, reduce the risk of hospitalization, and protect vulnerable groups such as children and the elderly.",
            image : banner3,
            btn_text : "Get Your Flu Shot Today"
        },
        {
            title : "COVID-19 Vaccines Now Available",
            subtitle : "COVID-19 vaccines are being distributed globally to protect people from severe illness and hospitalization. Approved vaccines are available through local health centers and vaccination programs.",
            image : banner2,
            btn_text : "Find Vaccination Campaigns"
        },
        {
            title : "Community Flu Vaccination Drive 2025",
            subtitle : "Join our upcoming flu vaccination campaign to stay safe this season. Free or low-cost flu shots are available at community health centers across the city.",
            image : banner4,
            btn_text : "See Nearby Flu Campaigns"
        }
    ]
    return (
        <>
        <Swiper
        // spaceBetween={30}
        // centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{"--swiper-navigation-size": "30px"}}>
            {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                    <CarouselSlide title={slide.title} subtitle={slide.subtitle} image={slide.image} btn_text={slide.btn_text}/>
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
};

export default HeroCarousel;