
// const CarouselSlide = ({ title,subtitle,image,btn_text }) => {
const CarouselSlide = ({image}) => {
    return (
        <div>
            {/* <section className="relative max-w-[1200px] mx-auto"> */}
            <section className="relative">
                {/* banner */}
                <div className="w-full px-3 md:px-0"> 
                    <img src={image} alt="banner"
                        className="w-full h-32 md:h-[350px] lg:h-[400px] object-cover rounded-md md:rounded-none"/>
                </div>

                {/* content */}
                {/* <div className="bg-white p-4 space-y-3 md:absolute md:top-0 md:left-20 md:w-[40%] md:space-y-5 md:p-6"> */}
                    {/* <h2 className="text-lg md:text-2xl font-bold text-black text-center md:text-left px-5 md:px-0"> */}
                        {/* {title} */}
                    {/* </h2> */}
{/*  */}
                    {/* <p className="hidden md:block text-black mt-2"> */}
                        {/* {subtitle} */}
                    {/* </p> */}
                    {/* <div className="hidden md:flex justify-end"> */}
                        {/* <button className="btn btn-primary px-3 py-2"> */}
                            {/* {btn_text} */}
                        {/* </button> */}
                    {/* </div> */}
                {/* </div> */}
            </section>
        </div>
    );
};

export default CarouselSlide;

