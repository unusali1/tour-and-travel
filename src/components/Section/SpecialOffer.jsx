import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import special1 from "../../assets/specialoffer/sp1.jpg";
import special2 from "../../assets/specialoffer/sp2.jpg";
import special3 from "../../assets/specialoffer/sp3.jpg";
import special4 from "../../assets/specialoffer/sp4.jpg";
import special5 from "../../assets/specialoffer/sp5.jpg";

const data = [
  {
    id: 1,
    title: "Get special student fare and extra baggage allowance",
    image: special1,
  },

  {
    id: 2,
    title: "Stopover opportunity in Istanbul with Turkish Airlines",
    image: special2,
  },

  {
    id: 3,
    title: "Explore Southeast Asia with up to 48% Off Flights",
    image: special3,
  },

  {
    id: 4,
    title: "Fly with Up to 55% Off on Malaysia Airlines",
    image: special4,
  },

  {
    id: 5,
    title: "Extra Baggage Allowance for Students",
    image: special5,
  },
];

const SpecialOffer = () => {
  return (
    <>
      <div className="sm:px-20 px-2 py-10">
        <Tabs defaultValue="all" className="">
          <div className="flex justify-between">
            <h2 className="sm:text-2xl font-lg font-bold mb-6 sm:ml-6 ml-2 sm:mt-0 mt-1">Special Offers</h2>
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hotel">Hotel</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
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
              {data.map((offer, index) => (
                <SwiperSlide key={index} className="sm:pl-8 pl-4 sm:pr-0 pr-4">
                  <Card className="p-2 shadow-md dark:bg-gray-800">
                    <CardContent>
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="rounded-lg mt-2"
                      />
                      <p className="text-xl text-primary font-semibold mt-2">
                        {offer.title}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 px-6 py-2 bg-[#FCCC02] font-semibold"
                      >
                        Learn More{" "}
                        <Icon icon="ep:right" className="font-bold text-4xl" />
                      </Button>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </TabsContent>
          <TabsContent value="hotel">
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
              {data.map((offer, index) => (
                <SwiperSlide key={index} className="sm:pl-8 pl-4 sm:pr-0 pr-4">
                  <Card className="p-2 shadow-md dark:bg-gray-800">
                    <CardContent>
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="rounded-lg mt-2"
                      />
                      <p className="text-xl text-primary font-semibold mt-2">
                        {offer.title}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 px-6 py-2 bg-[#FCCC02] font-semibold"
                      >
                        Learn More{" "}
                        <Icon icon="ep:right" className="font-bold text-4xl" />
                      </Button>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SpecialOffer;
