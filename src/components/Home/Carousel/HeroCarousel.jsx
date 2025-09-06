// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselSlide from "./CarouselSlide";
import banner1 from "../../../assets/images/bannerImage1.png"
import banner2 from "../../../assets/images/bannerImage2.jpg"

const HeroCarousel = () => {
    const slides = [
        {
            title : "Operation Warp Speed. Operation Warp Speed (OWS)",
            subtitle : "Lorem ipsum, placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout.",
            image : banner1,
            btn_text : "Learn more about OWS"
        },
        {
            title : "COVID-19 Vaccines Now Available",
            subtitle : "COVID-19 vaccines are being distributed globally to protect people from severe illness and hospitalization. Approved vaccines are available through local health centers and vaccination programs.",
            image : banner2,
            btn_text : "Find Vaccination Campaigns"
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