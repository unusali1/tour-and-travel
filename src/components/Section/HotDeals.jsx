import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useGetHotelsQuery } from "@/redux/hotels/hotelsApi";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

const HotDeals = ({date,guest}) => {
  const navigate = useNavigate();
  const [hotelList,setHotelList] = useState([]);
  const countryId = localStorage.getItem("selectedCountry");
  const { data: hotels, isLoading, isError } = useGetHotelsQuery();

  const handleSelectHotel = (slug) => {
    navigate(
      `/hotelDetails/${slug}?checkin=${date?.from}&checkout=${date?.to}&guests=${guest}`
    );
  };

  useEffect(() => {
    if (!isLoading && hotels && countryId) {
      const filteredHotels = hotels.filter(hotel => hotel.country_id === countryId);
      setHotelList(filteredHotels);
    }
  }, [hotels, isLoading, countryId]);


  
  let content = null 

  if (isLoading) {
    content = (
      <div className="flex justify-between">
        <div className="flex items-center space-x-4 w-full">
          <Skeleton className="h-[125px] w-[200px] rounded-xl" />
          <div>
            <Skeleton className="h-12 w-[200px]" />
            <Skeleton className="h-8 w-[200px] mt-2" />
            <Skeleton className="h-6 w-[200px] mt-2" />
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full">
          <Skeleton className="h-[125px] w-[200px] rounded-xl" />
          <div>
            <Skeleton className="h-12 w-[200px]" />
            <Skeleton className="h-8 w-[200px] mt-2" />
            <Skeleton className="h-6 w-[200px] mt-2" />
          </div>
        </div>
       
        <div className="flex items-center space-x-4 w-full">
          <Skeleton className="h-[125px] w-[200px] rounded-xl" />
          <div>
            <Skeleton className="h-12 w-[200px]" />
            <Skeleton className="h-8 w-[200px] mt-2" />
            <Skeleton className="h-6 w-[200px] mt-2" />
          </div>
        </div>

      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="flex flex-col items-center justify-center w-full h-64 bg-red-50 dark:bg-red-900 rounded-xl dark:border-red-700 shadow-sm">
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-200">
          Something went wrong, Please try again
        </h3>

      </div>
    );
  } else if (!isLoading && !isError && hotels?.length === 0) {
    content = <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500 dark:text-gray-400">
      <Icon icon="si:alert-duotone" className="font-bold text-2xl" />
      <h2 className="text-xl font-semibold">No Data Found</h2>
      <p className="text-sm mt-2">We couldn't find any results to display. Please modify search</p>
    </div>;
  } else if (!isLoading && !isError && hotels?.length > 0) {
    content = hotelList.map((offer, index)=>{
      return(
        <SwiperSlide key={index} className="sm:pl-8 pl-4 sm:pr-0 pr-4">
        <Card
          key={index}
          className="p-2 shadow-md relative sm:h-64 h-64 mb-6 mt-4 dark:bg-gray-800"
        >
          <CardContent>
            <img
              src={
                offer?.thumbnail_image?.length
                  ? `https://backend.dayfuna.com/storage/${offer?.thumbnail_image[0]}`
                  : null
              }
              alt={offer.name}
              className="rounded-lg mt-2 absolute h-32 w-36 -top-4 -left-3"
              
            />

            
            <div className="flex flex-col sm:ml-28 ml-32">
              <p className="sm:text-xl text-primary text-md sm:font-semibold font-medium justify-evenly mt-2">
                {offer.name}
              </p>

              <p className="text-sm mt-2 text-primary">
                {offer?.description &&
                offer?.description.split(" ").length > 20
                  ? offer?.description
                      .split(" ")
                      .slice(0, 20)
                      .join(" ") + "..."
                  : offer?.description}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between fixed bottom-4">
            <Button
              variant="secondary"
              className="bg-[#EBF3FE] dark:bg-gray-500 text-primary"
            >
              <Icon
                icon="streamline:discount-percent-fire"
                className="font-bold text-4xl"
              />
              {offer.status}
            </Button>
          </CardFooter>
          <Button
            variant="outline"
            className="absolute right-4 -bottom-2 bg-[#FCCC02] font-semibold"
            onClick={() => handleSelectHotel(offer?.slug)}
          >
            <Icon
              icon="heroicons:arrow-up-right-16-solid"
              className="font-bold text-4xl"
            />
            See Details
          </Button>
        </Card>
      </SwiperSlide>
      )
    })
  }


  return (
    <>
      <div className="sm:px-20 px-2 py-10">
        <div defaultValue="all" className="">
          <div className="flex justify-between">
            <h2 className="sm:text-2xl font-lg font-bold mb-6 sm:ml-6 ml-2 sm:mt-0 mt-1">
              Hotel lists
            </h2>
          </div>

          <div>
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {content}
              {/* {hotels?.map((offer, index) => (
                <SwiperSlide key={index} className="sm:pl-8 pl-4 sm:pr-0 pr-4">
                  <Card
                    key={index}
                    className="p-2 shadow-md relative sm:h-64 h-64 mb-6 mt-4 dark:bg-gray-800"
                  >
                    <CardContent>
                      <img
                        src={
                          offer?.thumbnail_image?.length
                            ? `https://backend.dayfuna.com/storage/${offer?.thumbnail_image[0]}`
                            : null
                        }
                        alt={offer.name}
                        className="rounded-lg mt-2 absolute h-32 w-36 -top-4 -left-3"
                      />
                      <div className="flex flex-col sm:ml-28 ml-32">
                        <p className="sm:text-xl text-primary text-md sm:font-semibold font-medium justify-evenly mt-2">
                          {offer.name}
                        </p>

                        <p className="text-sm mt-2 text-primary">
                          {offer?.description &&
                          offer?.description.split(" ").length > 20
                            ? offer?.description
                                .split(" ")
                                .slice(0, 20)
                                .join(" ") + "..."
                            : offer?.description}
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between fixed bottom-4">
                      <Button
                        variant="secondary"
                        className="bg-[#EBF3FE] dark:bg-gray-500 text-primary"
                      >
                        <Icon
                          icon="streamline:discount-percent-fire"
                          className="font-bold text-4xl"
                        />
                        {offer.status}
                      </Button>
                    </CardFooter>
                    <Button
                      variant="outline"
                      className="absolute right-4 -bottom-2 bg-[#FCCC02] font-semibold"
                      onClick={() => handleSelectHotel(offer?.slug)}
                    >
                      <Icon
                        icon="heroicons:arrow-up-right-16-solid"
                        className="font-bold text-4xl"
                      />
                      See Details
                    </Button>
                  </Card>
                </SwiperSlide>
              ))} */}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotDeals;
