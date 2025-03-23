import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import hotdeal1 from "../../assets/hotdeals/hot1.jpg";
import hotdeal2 from "../../assets/hotdeals/hot2.jpg";
import hotdeal3 from "../../assets/hotdeals/hot3.jpg";
import hotdeal4 from "../../assets/hotdeals/hot4.jpg";
import hotdeal5 from "../../assets/hotdeals/hot5.jpg";

const data = [
  {
    id: 1,
    title: "On Int’l Flight Booking for Mobile Banking",
    description:
      "On base fare, for Nagad, Tap, Upay and Rocket payments. Till 28 Feb’25",
    category: "FLYINT0125",
    image: hotdeal1,
  },

  {
    id: 2,
    title: "Up to BDT 5,500 Discount on Int’l Flight Bookings",
    description:
      "On total fare, for StanChart credit cards. Min. purchase value has to be BDT 25,000. Till 28 Feb’25",
    category: "FLYSC0225",
    image: hotdeal2,
  },

  {
    id: 3,
    title: "On Int’l Flight Bookings",
    description:
      "On base fare, for City Bank American Express® Platinum & Gold credit cards. Till 31 Dec’25",
    category: "AMEX1823",
    image: hotdeal3,
  },

  {
    id: 4,
    title: "On Int’l Flight Booking for Selected Cards",
    description:
      "On base fare, for BRAC, City AMEX, DBBL, EBL, HSBC, LankaBangla, MTB, Prime Bank, StanChart, Trust Bank, UCB, Midland Bank cards. Till 28 Feb’25.",
    category: "INTFLY0125",
    image: hotdeal4,
  },

  {
    id: 5,
    title: "On International Flight Booking",
    description: "On base fare, for bKash payment. Till 28 Feb’25.",
    category: "INTB0125",
    image: hotdeal5,
  },
];

const HotDeals = () => {
  return (
    <>
      <div className="sm:px-20 px-2 py-10">
        <Tabs defaultValue="all" className="">
          <div className="flex justify-between">
            <h2 className="sm:text-2xl font-lg font-bold mb-6 sm:ml-6 ml-2 sm:mt-0 mt-1">
              Hot Deals
            </h2>
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
                  <Card
                    key={index}
                    className="p-2 shadow-md relative sm:h-64 h-64 mb-6 mt-4 dark:bg-gray-800"
                  >
                    <CardContent>
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="rounded-lg mt-2 absolute h-32 w-36 -top-4 -left-3"
                      />
                      <div className="flex flex-col sm:ml-28 ml-32">
                        <p className="sm:text-xl text-primary text-md sm:font-semibold font-medium justify-evenly mt-2">
                          {offer.title}
                        </p>

                        <p className="text-sm mt-2 text-primary">
                          {offer.description}
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between fixed bottom-4">
                      <Button variant="secondary" className="bg-[#EBF3FE] dark:bg-gray-500 text-primary">
                        <Icon
                          icon="streamline:discount-percent-fire"
                          className="font-bold text-4xl"
                        />
                        {offer.category}
                      </Button>
                    </CardFooter>
                    <Button
                      variant="outline"
                      className="absolute right-4 -bottom-2 bg-[#FCCC02] font-semibold"
                    >
                      <Icon
                        icon="heroicons:arrow-up-right-16-solid"
                        className="font-bold text-4xl"
                      />
                      Learn More
                    </Button>
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
                  <Card
                    key={index}
                    className="p-2 shadow-md relative sm:h-64 h-64 mb-6 mt-4 dark:bg-gray-800"
                  >
                    <CardContent>
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="rounded-lg mt-2 absolute h-32 w-36 -top-4 -left-3"
                      />
                      <div className="flex flex-col sm:ml-28 ml-32">
                        <p className="sm:text-xl text-primary text-md sm:font-semibold font-medium justify-evenly mt-2">
                          {offer.title}
                        </p>

                        <p className="text-sm mt-2 text-primary">
                          {offer.description}
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between fixed bottom-4">
                      <Button variant="secondary" className="bg-[#EBF3FE] dark:bg-gray-500 text-primary">
                        <Icon
                          icon="streamline:discount-percent-fire"
                          className="font-bold text-4xl"
                        />
                        {offer.category}
                      </Button>
                    </CardFooter>
                    <Button
                      variant="outline"
                      className="absolute right-4 -bottom-2 bg-[#FCCC02] font-semibold"
                    >
                      <Icon
                        icon="heroicons:arrow-up-right-16-solid"
                        className="font-bold text-4xl"
                      />
                      Learn More
                    </Button>
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

export default HotDeals;
