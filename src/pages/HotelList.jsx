import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Navbar/Header";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import hotel1 from "../assets/hotel1.jpg";
import hotel2 from "../assets/hotel2.jpg";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"

const hotels = [
  {
    name: "Sayeman Heritage",
    location: "Cox's Bazar Sadar, Cox's Bazar",
    rating: 5,
    discount: 47,
    price: 10364,
    oldPrice: 19763,
    image: hotel1,
    tag: "Top Selling",
    roomsLeft: 1,
  },
  {
    name: "Royal Pearl Suites",
    location: "Kolatoli, Cox's Bazar",
    rating: 5,
    discount: 43,
    price: 3558,
    oldPrice: 6257,
    image: hotel2,
    tag: "Trending",
    roomsLeft: 2,
  },
];

export default function HotelList() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-12 gap-4 p-4 bg-background d px-16 mb-36 mt-16">
        <aside className="col-span-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="mt-4 flex justify-between">
            <h3 className="font-semibold">Filters</h3>
            <Button variant="ghost" className="text-sm">
              Reset
            </Button>
          </div>

          <Separator className="my-2" />
          <p className="font-medium text-[14px] text-[#022738] dark:text-primary">Property Name</p>
          <div className="flex w-full max-w-sm items-center border border-black dark:border-primary rounded-md overflow-hidden shadow-md mt-4 mb-4">
            {/* Input Field */}
            <Input
              type="text"
              placeholder="Property Name"
              className="flex-1 px-4 py-2 border-none focus:outline-none focus:border-none"
            />

            {/* Vertical Separator */}
            <Separator orientation="vertical" className="bg-black dark:bg-white w-[1.5px] h-9 " />

            {/* Search Button */}
            <Button type="submit" variant="ghost" className="p-3">
              <Icon icon="iconamoon:search-thin" className="text-2xl text-gray-600 dark:text-primary" />
            </Button>
          </div>




          <Separator className="my-4" />

          <p className="font-medium text-[14px] text-[#022738] dark:text-primary">Accommodation Type</p>
          <div className="flex flex-col gap-3 mt-4">

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Resort Hotel
              </label>
            </div>


            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Resort
              </label>
            </div>


            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Hotel
              </label>
            </div>

          </div>


        </aside>

        {/* Main Content */}
        <section className="col-span-9 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">9 properties found</h2>
            <select className="border p-2 rounded-md dark:bg-gray-800">
              <option>Popularity</option>
              <option>Price</option>
            </select>
          </div>
          {hotels.map((hotel, index) => (
            <Card key={index} className="flex p-4 relative dark:bg-gray-800">
              <CardContent className="flex justify-between gap-4 w-full ">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="rounded-lg h-44 w-52 object-cover"
                  />

                  <button className="absolute bottom-2 left-2 p-1.5 rounded-md bg-white hover:bg-white/20">
                    <Icon
                      icon="mdi:heart-outline"
                      className="font-bold text-sm"
                    />
                  </button>

                  <button className="flex absolute bottom-2 right-2 p-1.5 rounded-md bg-white/40  hover:bg-white/20">
                    <Icon
                      icon="mdi:bird"
                      className="font-bold text-xl text-red-500 "
                    />
                    <p className="text-[12px] text-white font-semibold">Get Points</p>
                  </button>


                </div>

                <button className="flex absolute top-8 left-2 p-1.5 rounded-md bg-[#EEF8FB] border border-blue-400">
                  <Icon
                    icon="flowbite:award-outline"
                    className="font-bold text-xl text-blue-950 "
                  />
                  <p className="text-[12px] text-[#00026E] font-semibold">Top Selling</p>
                </button>

                <div>

                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(hotel.rating)].map((undefined, i) => (
                      // <FaStar key={i} className="text-yellow-500" />
                      <p>sadgf</p>
                    ))}
                  </div>
                  <p className="text-red-500 text-sm">
                    {hotel.roomsLeft} Room Remaining
                  </p>
                </div>
                <div className="flex flex-col items-center  mt-10">
                  <div>
                    <p className="text-green-500 text-sm">
                      Extra 5% discount for Bkash
                    </p>
                    <p className="text-gray-400 line-through">
                      BDT {hotel.oldPrice}
                    </p>
                    <p className="text-lg font-bold">BDT {hotel.price}</p>
                    <Button className="bg-yellow-500 text-white">Select</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </>
  );
}
