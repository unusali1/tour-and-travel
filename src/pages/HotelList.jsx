import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Navbar/Header";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { hotelArea, hotelLists } from "@/assets/data/HotelData";

import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function HotelList() {
  const navigate = useNavigate();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [roomsCount, setRommsCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [country, setCountry] = useState("");
  const [visaType, setVisaType] = useState("Tourist");
  const [active, setactive] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("BDT");

  const [totalTravelers, setTotalTravelers] = useState({
    rooms: " ",
    adult: " ",
    child: " ",
    total: " ",
  });

  const handleAdultCountChange = (action) => {
    if (action === "increase") {
      setAdultCount(adultCount + 1);
    } else if (action === "decrease" && adultCount > 0) {
      setAdultCount(adultCount - 1);
    }
  };

  const handleChildCountChange = (action) => {
    if (action === "increase") {
      setChildCount(childCount + 1);
    } else if (action === "decrease" && childCount > 0) {
      setChildCount(childCount - 1);
    }
  };
  const handleRommsCountChange = (action) => {
    if (action === "increase") {
      setRommsCount(roomsCount + 1);
    } else if (action === "decrease" && roomsCount > 1) {
      setRommsCount(roomsCount - 1);
    }
  };

  useEffect(() => {
    const total = adultCount + childCount;
    setTotalTravelers({
      adult: adultCount,
      child: childCount,
      rooms: roomsCount,
      total: total,
    });
  }, [adultCount, childCount, roomsCount]);

  const fromDate = addDays(new Date(), 5);
  const toDate = addDays(new Date(), 6);

  const [date, setDate] = useState({
    from: fromDate,
    to: toDate,
    fromDayName: format(fromDate, "EEEE"),
    toDayName: format(toDate, "EEEE"),
  });

  const handleSelect = (selected) => {
    setDate({
      ...selected,
      fromDayName: selected?.from ? format(selected.from, "EEEE") : "",
      toDayName: selected?.to ? format(selected.to, "EEEE") : "",
    });
  };

  const handleSelectHotel = () => {
    navigate(`/hotelDetails/${1}`);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 dark:bg-background">
        <div className="dark:bg-background bg-gray-100 sm:min-w-fit min-w-full">
          <div className="flex sm:mt-0 mt-8 sm:mb-8 justify-between px-24 pt-5 flex-col sm:flex-row">
            <div className="sm:mt-0 flex flex-col rounded-md sm:ml-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex flex-col dark:bg-gray-800 text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400"
                  >
                    <label className="text-[12px] text-blue-500">
                      CITY/HOTEL/RESORT/AREA
                    </label>
                    <span>
                      <p>
                        {value
                          ? hotelArea.find((hotel) => hotel.value === value)
                              ?.label
                          : "Select Destination..."}
                      </p>
                      <p className="flex text-[12px] text-gray-400">
                        Bangladesh
                      </p>
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Destination..." />
                    <CommandList>
                      <CommandEmpty>No Destination found.</CommandEmpty>
                      <CommandGroup>
                        {hotelArea.map((hotel) => (
                          <CommandItem
                            key={hotel.value}
                            value={hotel.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <span className="flex space-x-1">
                              <Icon
                                icon="mdi:location"
                                className="font-bold text-4xl text-black mt-2"
                              />
                              <span>
                                <p className="font-semibold "> {hotel.label}</p>
                                <p className="text-[12px] text-gray-400">
                                  {hotel.country}
                                </p>
                              </span>
                            </span>
                            <Check
                              className={cn(
                                "ml-auto",
                                value === hotel.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="sm:mt-0 flex flex-col rounded-md sm:ml-4">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "flex flex-col dark:bg-gray-800 text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <label className="text-[12px] text-blue-500">
                      CHECK IN
                    </label>

                    {date?.from ? (
                      <span>
                        <p className="flex">{format(date.from, "LLL dd, y")}</p>
                        <p className="flex text-[12px] text-gray-400">
                          {date.fromDayName}
                        </p>
                      </span>
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <p className="text-center p-4">Select check-in date</p>
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="sm:mt-0 flex flex-col rounded-md sm:ml-4">
              <Button
                id="date"
                variant="outline"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className={cn(
                  "flex  dark:bg-gray-800 flex-col items-start text-left sm:w-[240px] w-full font-normal py-10 border border-gray-400",
                  !date && "text-muted-foreground"
                )}
              >
                <label className="text-[12px] text-blue-500">CHECK OUT</label>

                {date?.to ? (
                  <span>
                    <p className="flex">{format(date.to, "LLL dd, y")}</p>
                    <p className="flex text-[12px] text-gray-400">
                      {date.toDayName}
                    </p>
                  </span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </div>

            <div className="sm:mt-0 flex flex-col rounded-md sm:ml-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex  dark:bg-gray-800 flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400 rounded-lg"
                  >
                    <label className="text-[12px] text-blue-500 ">
                      ROOMS & GUESTS
                    </label>
                    <span>
                      <p>
                        <span className="text-blue-900 font-bold ">
                          {totalTravelers.rooms}
                        </span>{" "}
                        Rooms,
                        <span className="text-blue-900 font-bold ">
                          {totalTravelers.total}
                        </span>{" "}
                        Guests
                      </p>
                      <p className="text-[12px] text-gray-400">{`${totalTravelers.adult} adults & ${totalTravelers.child} childs`}</p>
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex ml-4 justify-between">
                    <div>
                      <h4 className="font-bold text-blue-800">Rooms</h4>
                      <p className="text-[12px]">{`${totalTravelers.total} Guests`}</p>
                    </div>
                    <div className="flex ml-10">
                      <Button
                        className=" border border-gray-200 rounded-full"
                        onClick={() => handleRommsCountChange("decrease")}
                        variant="oulined"
                      >
                        -
                      </Button>
                      <p className="ml-4 mt-2">{roomsCount}</p>
                      <Button
                        className="ml-4 border border-gray-200 rounded-full"
                        onClick={() => handleRommsCountChange("increase")}
                        variant="oulined"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  <div className="flex ml-4 justify-between">
                    <div>
                      <h4 className="font-bold">Adult</h4>
                      <p className="text-[12px]">12 years +</p>
                    </div>
                    <div className="flex ml-10">
                      <Button
                        className=" border border-gray-200 rounded-full"
                        onClick={() => handleAdultCountChange("decrease")}
                        variant="oulined"
                      >
                        -
                      </Button>
                      <p className="ml-4 mt-2">{adultCount}</p>
                      <Button
                        className="ml-4 border border-gray-200 rounded-full"
                        onClick={() => handleAdultCountChange("increase")}
                        variant="oulined"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4" />

                  <div className="flex ml-4 justify-between">
                    <div>
                      <h4 className="font-bold">Children</h4>
                      <p className="text-[12px]">Under 12 years</p>
                    </div>
                    <div className="flex ml-10">
                      <Button
                        className=" border border-gray-200 rounded-full"
                        onClick={() => handleChildCountChange("decrease")}
                        variant="oulined"
                      >
                        -
                      </Button>
                      <p className="ml-4 mt-2">{childCount}</p>
                      <Button
                        className="ml-4 border border-gray-200 rounded-full"
                        onClick={() => handleChildCountChange("increase")}
                        variant="oulined"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4" />

                  <div className="mt-4 flex justify-end">
                    <Button color="primary">OK</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex justify-center shadow-sm h-20">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-[#00026E] dark:text-primary dark:bg-gray-800  font-bold px-4 rounded-lg w-full">
                Modify
                <br /> Search
              </button>
            </div>
          </div>
        </div>

        <Separator className="my-1" />

        <div className="bg-gray-100 grid grid-cols-12 gap-4 pt-5  dark:bg-background px-24 pb-24">
          <aside className="col-span-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="mt-4 flex justify-between">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" className="text-sm">
                Reset
              </Button>
            </div>

            <Separator className="my-2" />
            <p className="font-medium text-[14px] text-[#022738] dark:text-primary">
              Property Name
            </p>
            <div className="flex w-full max-w-sm items-center border border-black dark:border-primary rounded-md overflow-hidden shadow-md mt-4 mb-4">
              {/* Input Field */}
              <Input
                type="text"
                placeholder="Property Name"
                className="flex-1 px-4 py-2 border-none focus:outline-none focus:border-none"
              />

              {/* Vertical Separator */}
              <Separator
                orientation="vertical"
                className="bg-black dark:bg-white w-[1.5px] h-9 "
              />

              {/* Search Button */}
              <Button type="submit" variant="ghost" className="p-3">
                <Icon
                  icon="iconamoon:search-thin"
                  className="text-2xl text-gray-600 dark:text-primary"
                />
              </Button>
            </div>

            <Separator className="my-4" />

            <p className="font-medium text-[14px] text-[#022738] dark:text-primary">
              Accommodation Type
            </p>
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
            {hotelLists.map((hotel, index) => (
              <Card key={index} className="flex p-4 relative dark:bg-gray-800">
                <CardContent className="flex justify-between gap-4 w-full ">
                  <div className="relative">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="rounded-lg h-56 w-64 object-cover"
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
                      <p className="text-[12px] text-white font-semibold">
                        Get Points
                      </p>
                    </button>
                  </div>

                  <button className="flex absolute top-8 left-2 p-1.5 rounded-md bg-[#EEF8FB] border border-blue-400">
                    <Icon
                      icon="flowbite:award-outline"
                      className="font-bold text-xl text-blue-950 "
                    />
                    <p className="text-[12px] text-[#00026E] font-semibold">
                      Top Selling
                    </p>
                  </button>

                  <div>
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>

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

                    <p className="text-red-500 text-sm border border-red-500 rounded-3xl max-w-fit px-2 py-1 mt-3">
                      {hotel.roomsRemaining} Room Remaining
                    </p>
                    <div className="flex space-x-2 mt-4">
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
                  <div className="flex flex-col items-end space-y-1 mt-10">
                    <p className="bg-red-500 text-white rounded-2xl px-2 py-1 max-w-fit text-sm">
                      {hotel.discount} off
                    </p>
                    <p className="text-green-500 text-sm">
                      Extra 5% discount for Bkash
                    </p>
                    <p className="text-gray-400 line-through">
                      BDT {hotel.oldPrice}
                    </p>
                    <p className="text-lg font-bold">{hotel.newprice}</p>
                    <p className="text-[12px] text-gray-400 ">
                      for 1 night, per room
                    </p>

                    <Button
                      className="bg-yellow-500 text-white"
                      onClick={handleSelectHotel}
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
