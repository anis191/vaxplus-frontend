import doctor1 from "../../../assets/images/doctor1.jpg";
import doctor2 from "../../../assets/images/doctor2.jpg";
import doctor3 from "../../../assets/images/doctor3.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {Autoplay, Pagination } from "swiper/modules";
import Doctor from "../../Doctors/Doctor";

export default function App() {
    const doctors = [
        {
            id: 1,
            bio: {
                id: 1,
                first_name: "Dr.Arif",
                last_name: "Hossain",
                phone_number: "0185678004"
            },
            specialization: "Neurologist(NLP)",
            contact: "tamp@gmail.com",
            profile_picture: doctor1
        },
        {
            id: 2,
            bio: {
                id: 2,
                first_name: "Dr.Nur",
                last_name: "Islam",
                phone_number: "0175678004"
            },
            specialization: "Neurologist(NL)",
            contact: "tamp@gmail.com",
            profile_picture: doctor2
        },
        {
            id: 3,
            bio: {
                id: 3,
                first_name: "Dr. Salman",
                last_name: "Khan",
                phone_number: "0165678004"
            },
            specialization: "Neurologist(LP)",
            contact: "tamp@gmail.com",
            profile_picture: doctor3
        },
        {
            id: 4,
            bio: {
                id: 4,
                first_name: "Dr.temp",
                last_name: "user",
                phone_number: "0165678004"
            },
            specialization: "Neurologist(NP)",
            contact: "tamp@gmail.com",
            profile_picture: doctor1
        },
    ]

  return (
    <>
    <div className="text-center mb-8 px-4 sm:px-6 md:px-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Meet Our Doctors
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg">
        Our team of experienced specialists is here to provide the best care for you.
        </p>
    </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
        className="mySwiper">
            {doctors.map((doctor)=>(
                <SwiperSlide key={doctor.id}>
                    <Doctor doctor={doctor}/>
                </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
