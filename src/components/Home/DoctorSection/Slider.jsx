import { Swiper, SwiperSlide } from 'swiper/react';
import Error from "../../Common/Error"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {Autoplay, Pagination } from "swiper/modules";
import Doctor from "../../Doctors/Doctor";
import useFetchDoctors from "../../../hooks/useFetchDoctors";
import DoctorSkeleton from '../../Skeletons/DoctorSkeleton';

export default function App() {
    const {doctors, loading, error} = useFetchDoctors()

    if(error)
      return(<Error message={error} />)

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

    {loading ? (
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
        className="mySwiper">
        {[...Array(3)].map((_, index) => (
          <SwiperSlide key={index}>
            <DoctorSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
        className="mySwiper">
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <Doctor doctor={doctor} />
          </SwiperSlide>
        ))}
      </Swiper>
    )}
    </>
  );
}
