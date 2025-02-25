import { hotelLists, rooms } from "@/assets/data/HotelData";
import Header from "@/components/Navbar/Header";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HotelDetails = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {dialogOpen ? null : <Header />}
      <div className="bg-gray-100 dark:bg-background text-gray-900 pb-16">
        {hotelLists.slice(0, 1).map((hotel, index) => (
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3}
                  loop={true}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                  }}
                >
                  {hotel.images.map((item, index) => (
                    <SwiperSlide key={index} className="sm:pr-0 mt-4">
                      <img
                        src={item}
                        alt="Hotel"
                        onClick={() => setDialogOpen(true)}
                        className="w-full h-[50vh] rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="flex md:col-span-2 sm:flex-row flex-col">
                <div className="flex sm:flex-col sm:space-x-0 space-x-2 flex-row sm:space-y-2 sm:mt-4 mt-1 sm:h-[50vh] h-[10vh]">
                  {hotel.images.map((item, index) => (
                    <div
                      key={index}
                      className="sm:w-36 sm:h-36 w-20 h-20 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-all duration-300"
                    >
                      <img
                        src={item}
                        onClick={() => setDialogOpen(true)}
                        alt="Hotel Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="px-4">
                  <h1 className="text-3xl font-semibold text-primary mt-4">
                    Sayeman Heritage
                  </h1>
                  <div className="flex space-x-2 mt-2">
                    <span className="flex border p-1 rounded-md">
                      <Icon
                        icon="material-symbols-light:star-rounded"
                        className="font-bold text-xl text-[#FCCD00] "
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Star
                      </p>
                    </span>

                    <span className="flex p-1">
                      <Icon
                        icon="mdi:location"
                        className="font-bold text-xl text-blue-950 dark:text-white "
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {hotel.location}
                      </p>
                    </span>
                  </div>
                  <p className="mt-4  dark:text-white">What's Nearby</p>
                  <ul className="space-y-2 text-gray-600 mt-2">
                    {hotel.nearby.map((item, index) => (
                      <li className="flex items-start space-x-2" key={index}>
                        <Icon
                          icon="mdi:location"
                          className="font-bold text-xl text-gray-400 dark:text-white "
                        />
                        <span className="text-sm dark:text-white">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="flex border rounded-2xl mt-4 py-1 px-4 w-fit space-x-1">
                    <Icon
                      icon="mdi:house-heart"
                      className="font-bold text-xl  text-gray-400 dark:text-white "
                    />
                    <p className="text-sm  dark:text-white">Couple Friendly</p>
                  </span>

                  <h3 className="text-md font-semibold mt-2  dark:text-white">
                    Facilities
                  </h3>

                  <div className="flex space-x-2 mt-2">
                    {hotel.facilities[0]?.general
                      ?.slice(0, 3)
                      .map((item, index) => (
                        <span key={index} className="flex">
                          <Icon
                            icon="mdi:success"
                            className="font-bold text-xl text-gray-400 dark:text-gray-300 "
                          />
                          <p className="text-sm text-gray-400 dark:text-gray-300">
                            {item}
                          </p>
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl dark:text-white font-bold">
                Hotel Description
              </h2>
              <p className="text-sm font-semibold flex space-x-3 mt-2 text-[#3A4856]  dark:text-white">
                <span>Number of Rooms: {hotel.rooms}</span>
                <span>Number of Floors: {hotel.floors}</span>
                <span>Year of construction: {hotel.construction}</span>
              </p>
              <p className="text-[#3A4856] text-[14px] text-justify dark:text-white mt-2">
                {hotel.description}
              </p>
            </div>

            {/* Room Details Section */}
            <h2 className="text-2xl font-semibold mt-8">Room Details</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-8 mt-4">
              <div className="sm:w-2/3 w-full">
                {rooms.slice(0, 1).map((room, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 gap-6"
                  >
                    <div className="md:w-96">
                      <div key={index}>
                        <Swiper
                          spaceBetween={20}
                          slidesPerView={1}
                          loop={true}
                          modules={[Autoplay]}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            reverseDirection: true,
                          }}
                          className="rounded-xl overflow-hidden"
                        >
                          {room.images.map((item, index) => (
                            <SwiperSlide key={index} className="sm:pr-0">
                              <img
                                src={item}
                                alt="Hotel"
                                className="w-full h-48 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        <div className="flex space-x-2 mt-2">
                          {room.images.slice(0, 3).map((item, index) => (
                            <img
                              key={index}
                              src={item}
                              alt="Hotel"
                              className="sm:w-36 sm:h-20 w-24 h-20 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                          ))}
                        </div>

                        <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
                          {room.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex">
                          <Icon
                            icon="mingcute:bed-fill"
                            className="font-bold text-xl text-gray-400 dark:text-gray-500"
                          />
                          <span>King</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex">
                          <Icon
                            icon="mdi:account"
                            className="font-bold text-xl text-gray-400 dark:text-gray-500"
                          />
                          <span>Max Capacity: 2 Adults, 1 Child</span>
                        </p>
                        <p className="text-lg font-bold text-yellow-600 mt-2">
                          BDT 10,000 / night
                        </p>

                        <p className="text-blue-900 dark:text-gray-400 text-sm underline">
                          View Room Details
                        </p>
                        <p className="text-red-600 dark:text-gray-400 mt-4">
                          Hurry Up! Only 5 Rooms Left
                        </p>
                        <div className="flex space-x-2 mt-2">
                          {room.facilities[0]?.bedroomFacilities
                            ?.slice(0, 3)
                            .map((item, index) => (
                              <span key={index} className="flex">
                                <Icon
                                  icon="mdi:success"
                                  className="font-bold text-xl text-gray-400 dark:text-gray-300 "
                                />
                                <p className="text-sm text-gray-400 dark:text-gray-300">
                                  {item}
                                </p>
                              </span>
                            ))}
                        </div>

                        <p className="text-blue-900 dark:text-gray-400 text-sm underline mt-2">
                          Show All
                        </p>
                      </div>
                    </div>

                    <div className="md:w-2/3 rounded-2xl p-4 flex space-x-3">
                      <Separator
                        orientation="vertical"
                        className="dark:bg-gray-600"
                      />
                      <div className="flex justify-end space-x-6">
                        <div className="">
                          <p className="text-sm text-gray-800 bg-gray-200 w-fit px-2 py-1 rounded-lg">
                            option 1
                          </p>
                          <span className="flex py-1">
                            <p className="font-semibold text-gray-400">
                              Refundable{" "}
                            </p>
                            <Icon
                              icon="akar-icons:info-fill"
                              className="font-bold text-xl text-gray-400 dark:text-gray-500"
                            />
                          </span>

                          <span className="flex py-1">
                            <Icon
                              icon="mdi:people"
                              className="font-bold text-xl text-gray-400 dark:text-gray-500"
                            />
                            <p className="text-[12px] text-gray-400">
                              4 Adults, 2 Children
                            </p>
                          </span>

                          <span className="flex py-1">
                            <Icon
                              icon="ri:restaurant-2-fill"
                              className="font-bold text-xl text-gray-400 dark:text-gray-500"
                            />
                            <p className="text-[12px] text-gray-400 ">
                              Breakfast Included
                            </p>
                          </span>
                          <p className="text-[12px] text-gray-400 py-1">
                            Complimentary buffet breakfast with airport transfer
                            - Refundable
                          </p>
                          <span className="flex py-1">
                            <Icon
                              icon="ph:dot-fill"
                              className="font-bold text-xl text-gray-400 dark:text-gray-500"
                            />
                            <p className="text-[12px] text-gray-400">
                              Free cancellation before 00:01 on Mon, 24 Feb 2025
                            </p>
                          </span>
                        </div>

                        <div>
                          <p className="text-sm text-white dark:text-white bg-[#FD7E13] w-fit px-2 py-1 rounded-lg">
                            47% off
                          </p>
                          <p className="text-[12px] text-gray-400 py-1">
                            *Extra 5% discount for bKash Payment
                          </p>
                          <p className="py-1 text-[#3A4856] dark:text-primary">
                            Starts form
                          </p>
                          <del className="text-[12px] text-gray-400 py-1">
                            BDT 19,763
                          </del>
                          <p className="py-1 font-bold text-[#3A4856] dark:text-primary">
                            BDT 10,364
                          </p>
                          <p className="text-[12px] text-gray-400 py-1">
                            + BDT 2,746 Taxes & Fees for 1 Night
                          </p>

                          <Button
                            variant="destructive"
                            className="text-sm mt-4 transition-transform transform hover:scale-105"
                          >
                            Add Room
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sm:w-1/3 w-full bg-white dark:bg-gray-800 rounded-md p-6 ">
                <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Check-in:</span>
                    <span>20th Oct 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Check-out:</span>
                    <span>25th Oct 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Nights:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total Price:</span>
                    <span>BDT 50,000</span>
                  </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl w-full mt-6 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>

            {/* Facilities Section */}
            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#00026E] dark:text-white">
              Facilities
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <p className="mt-2 text-[#00026E] dark:text-gray-300 font-medium">
                Business Facilities
              </p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {hotel.facilities[0]?.businessFacilities.map((item, index) => (
                  <span key={index} className="flex">
                    <Icon
                      icon="mdi:success"
                      className="font-bold text-xl text-gray-400 dark:text-gray-500"
                    />
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {item}
                    </p>
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[#00026E] dark:text-gray-300 font-medium">
                Fitness & Wellness Facilities
              </p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {hotel.facilities[0]?.fitnessWellnessFacilities.map(
                  (item, index) => (
                    <span key={index} className="flex">
                      <Icon
                        icon="mdi:success"
                        className="font-bold text-xl text-gray-400 dark:text-gray-500"
                      />
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {item}
                      </p>
                    </span>
                  )
                )}
              </div>

              <p className="mt-2 text-[#00026E] dark:text-gray-300 font-medium">
                General
              </p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {hotel.facilities[0]?.general.map((item, index) => (
                  <span key={index} className="flex">
                    <Icon
                      icon="mdi:success"
                      className="font-bold text-xl text-gray-400 dark:text-gray-500"
                    />
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {item}
                    </p>
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[#00026E] dark:text-gray-300 font-medium">
                Media & Technology
              </p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {hotel.facilities[0]?.mediaTechnology.map((item, index) => (
                  <span key={index} className="flex">
                    <Icon
                      icon="mdi:success"
                      className="font-bold text-xl text-gray-400 dark:text-gray-500"
                    />
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {item}
                    </p>
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[#00026E] dark:text-gray-300 font-medium">
                Parking
              </p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {hotel.facilities[0]?.parking.map((item, index) => (
                  <span key={index} className="flex">
                    <Icon
                      icon="mdi:success"
                      className="font-bold text-xl text-gray-400 dark:text-gray-500"
                    />
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {item}
                    </p>
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[#00026E] dark:text-gray-300 font-medium">
                Safety & Security
              </p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {hotel.facilities[0]?.safetySecurity.map((item, index) => (
                  <span key={index} className="flex">
                    <Icon
                      icon="mdi:success"
                      className="font-bold text-xl text-gray-400 dark:text-gray-500 "
                    />
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {item}
                    </p>
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[#00026E] dark:text-gray-300 font-medium">
                Transportation
              </p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {hotel.facilities[0]?.transportation.map((item, index) => (
                  <span key={index} className="flex">
                    <Icon
                      icon="mdi:success"
                      className="font-bold text-xl text-gray-400 dark:text-gray-500"
                    />
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {item}
                    </p>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog
        open={dialogOpen}
        className="flex items-center justify-center"
      >
        <AlertDialogContent className="max-w-6xl max-h-screen bg-white rounded-2xl shadow-2xl p-6">
          <AlertDialogFooter>
            <Button
              className="px-6 py-2 bg-gray-300 text-white font-semibold rounded-lg"
              onClick={() => setDialogOpen(false)}
            >
              <Icon
                icon="mingcute:close-fill"
                className="font-bold text-xl text-blue-800 "
              />
            </Button>
          </AlertDialogFooter>
          <div className="max-w-5xl">
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
              }}
            >
              {hotelLists.slice(0, 1).map((hotel, index) => (
                <div key={index}>
                  {hotel.images.map((item, index) => (
                    <SwiperSlide key={index} className="sm:pr-0">
                      <img
                        src={item}
                        alt="Hotel"
                        className="min-full h-full rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </div>
              ))}
            </Swiper>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HotelDetails;
