// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselSlide from "./CarouselSlide";
import banner1 from "../../../assets/banners/banner1.jpg"
import banner2 from "../../../assets/banners/banner2.jpg"
import banner3 from "../../../assets/banners/banner3.jpg"
import banner4 from "../../../assets/banners/banner4.jpg"
import banner5 from "../../../assets/banners/banner5.jpg"
import banner6 from "../../../assets/banners/banner6.jpg"
import banner7 from "../../../assets/banners/banner7.jpg"
import banner8 from "../../../assets/banners/banner8.jpg"

const HeroCarousel = () => {
    const slides = [
        banner1,banner2,banner3,banner4,banner5,banner6,banner7,banner8
        // {
            // title : "Seasonal Flu Shots – Protect Yourself and Others",
            // subtitle : "Annual flu vaccines are the best way to prevent influenza, reduce the risk of hospitalization, and protect vulnerable groups such as children and the elderly.",
            // image : banner3,
            // btn_text : "Get Your Flu Shot Today"
        // },
        // {
            // title : "COVID-19 Vaccines Now Available",
            // subtitle : "COVID-19 vaccines are being distributed globally to protect people from severe illness and hospitalization. Approved vaccines are available through local health centers and vaccination programs.",
            // image : banner2,
            // btn_text : "Find Vaccination Campaigns"
        // },
        // {
            // title : "Community Flu Vaccination Drive 2025",
            // subtitle : "Join our upcoming flu vaccination campaign to stay safe this season. Free or low-cost flu shots are available at community health centers across the city.",
            // image : banner4,
            // btn_text : "See Nearby Flu Campaigns"
        // }
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
                    {/* <CarouselSlide title={slide.title} subtitle={slide.subtitle} image={slide.image} btn_text={slide.btn_text}/> */}
                    <CarouselSlide image={slide}/>
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
};

export default HeroCarousel;