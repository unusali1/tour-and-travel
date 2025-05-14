import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Navbar/Header";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import hotel1 from "../assets/hotel1.jpg";
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
import { useGetCitiesQuery, useHotelSearchMutation } from "@/redux/hotels/hotelsApi";

export default function HotelList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [roomsCount, setRommsCount] = useState(1);
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId"));
  const [categoryName, setCategoryName] = useState(searchParams.get("categoryName"));
  const [hotelId, setHotelId] = useState(searchParams.get("hotelId"));
  const [open, setOpen] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);
  const [value, setValue] = useState(searchParams.get("location"));
  const [totalTravelers, setTotalTravelers] = useState({
    rooms: " ",
    adult: " ",
    child: " ",
    total: " ",
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showSection, setShowSection] = useState(true);
  const countryId = parseInt(localStorage.getItem("selectedCountry"));
  
  const cleanDate = (dateString) => {
    return dateString ? dateString.replace(/[\d]$/g, "").trim() : null;
  };

  const checkin = cleanDate(searchParams.get("checkin"));
  const checkout = cleanDate(searchParams.get("checkout"));

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };


  const fromDate = isValidDate(checkin)
    ? addDays(new Date(checkin), 0)
    : addDays(new Date(), 5);
  const toDate = isValidDate(checkout)
    ? addDays(new Date(checkout), 0)
    : addDays(new Date(), 6);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const { data: cities } = useGetCitiesQuery(countryId);
  const [hotelSearch, { data, isLoading, isError }] = useHotelSearchMutation();

  useEffect(() => {
    setAdultCount(Number(searchParams.get("adult")) || 0);
    setChildCount(Number(searchParams.get("child")) || 0);
    setRommsCount(Number(searchParams.get("rooms")) || 1); 
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
        setShowSection(false);
      } else {
        setIsSmallScreen(false);
        setShowSection(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAdultCountChange = (action) => {
    if (action === "increase") {
      setAdultCount((prev) => prev + 1);
    } else if (action === "decrease" && adultCount > 0) {
      setAdultCount((prev) => prev - 1);
    }
  };
  
  const handleChildCountChange = (action) => {
    if (action === "increase") {
      setChildCount((prev) => prev + 1);
    } else if (action === "decrease" && childCount > 0) {
      setChildCount((prev) => prev - 1);
    }
  };
  
  const handleRommsCountChange = (action) => {
    if (action === "increase") {
      setRommsCount((prev) => prev + 1);
    } else if (action === "decrease" && roomsCount > 1) {
      setRommsCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const total = parseInt(adultCount) + parseInt(childCount);
    setTotalTravelers({
      adult: adultCount,
      child: childCount,
      rooms: roomsCount,
      total: total,
    });
  }, [adultCount, childCount, roomsCount]);

  useEffect(() => {
   if(hotelId && categoryId && countryId){
    hotelSearch({
      check_in: formatDate(fromDate),
      check_out: formatDate(toDate),
      category_id: String(categoryId),
      city_id: String(hotelId),
      country_id: String(countryId),
      capacity: totalTravelers?.total
    })
   }

  }, [totalTravelers?.total, countryId, hotelId, categoryId])


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

  const handleSelectHotel = (slug) => {
    navigate(`/hotelDetails/${slug}?checkin=${date?.from}&checkout=${date?.to}&guests=${totalTravelers?.total}&categoryName=${categoryName}`);
  };

  const handleModifySearch = () => {
    hotelSearch({
      check_in: formatDate(fromDate),
      check_out: formatDate(toDate),
      category_id: String(categoryId),
      city_id: String(hotelId),
      country_id: String(countryId),
      capacity: totalTravelers?.total
    })
  }

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex flex-col py-4">
        <div className="flex items-center space-x-4 w-full">
          <Skeleton className="h-[125px] w-[350px] rounded-xl" />
          <div>
            <Skeleton className="h-12 w-[350px]" />
            <Skeleton className="h-8 w-[350px] mt-2" />
            <Skeleton className="h-6 w-[350px] mt-2" />
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full mt-3">
          <Skeleton className="h-[125px] w-[350px] rounded-xl" />
          <div>
            <Skeleton className="h-12 w-[350px]" />
            <Skeleton className="h-8 w-[350px] mt-2" />
            <Skeleton className="h-6 w-[350px] mt-2" />
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full mt-3">
          <Skeleton className="h-[125px] w-[350px] rounded-xl" />
          <div>
            <Skeleton className="h-12 w-[350px]" />
            <Skeleton className="h-8 w-[350px] mt-2" />
            <Skeleton className="h-6 w-[350px] mt-2" />
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
  } else if (!isLoading && !isError && data?.rooms?.length === 0) {
    content = <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500 dark:text-gray-400">
      <Icon icon="si:alert-duotone" className="font-bold text-2xl" />
      <h2 className="text-xl font-semibold">No Data Found</h2>
      <p className="text-sm mt-2">We couldn't find any results to display. Please modify search</p>
    </div>;
  } else if (!isLoading && !isError && data?.rooms?.length > 0) {
    content = data?.rooms?.map((hotel) => {
      return (
        <Card
          key={hotel.id}
          className="flex sm:p-4 py-4 px-2 relative dark:bg-gray-800"
        >
          <CardContent className="flex justify-between sm:flex-row flex-col gap-4 w-full ">
            <div className="relative">
              <img
                src={hotel?.hotel?.thumbnail_image?.length
                  ? `https://backend.dayfuna.com/storage/${hotel?.hotel?.thumbnail_image[0]}`
                  : hotel1}

                // src={hotel1}
                alt={hotel?.hotel?.name}
                className="rounded-lg smn:h-56 h-full sm:w-64 w-full object-cover"
                loading="lazy"
              />

              <button className="absolute bottom-2 left-2 p-1.5 rounded-md bg-white hover:bg-white/20">
                <Icon icon="mdi:heart-outline" className="font-bold text-sm" />
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
              <h3 className="text-lg font-semibold">{hotel?.hotel?.name}</h3>
              <div className="flex sm:space-x-2 space-x-0 mt-2 flex-col sm:flex-row">
                <span className="flex border p-1 rounded-md  w-fit">
                  <Icon
                    icon="material-symbols-light:star-rounded"
                    className="font-bold text-xl text-[#FCCD00] "
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {hotel?.hotel?.rating} Star
                  </p>
                </span>

                <span className="flex p-1 sm:mt-0 mt-2">
                  <Icon
                    icon="mdi:location"
                    className="font-bold text-xl text-blue-950 dark:text-white "
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {hotel?.hotel?.address},{hotel?.hotel?.country?.name}
                  </p>
                </span>
              </div>


              <p className="text-red-500 text-sm border border-red-500 rounded-3xl max-w-fit px-2 py-1 mt-3">
                6 Room Remaining
              </p>
              <div className="flex sm:space-x-2 space-x-0 mt-4">
                {["Accessible Bathroom", "Air Conditioning", "Garden"].map((item, index) => (
                  <span key={index} className="flex">
                    <Icon
                      icon="mdi:success"
                      className="font-bold text-xl text-gray-400 dark:text-gray-300 "
                    />
                    <p className="sm:text-sm text-[12px] text-gray-400 dark:text-gray-300">
                      {item}
                    </p>
                  </span>
                ))}
              </div>

              <Button
                className="bg-yellow-500 text-white mt-4"
                onClick={() => handleSelectHotel(hotel?.hotel?.slug)}
              >
                Select
              </Button>
            </div>
            <div className="flex flex-col sm:items-end items-start space-y-1 sm:mt-10 mt-2">
              {/* <p className="bg-red-500 text-white rounded-2xl px-2 py-1 max-w-fit text-sm">
                    {hotel.discount} off
                  </p> */}
              {/* <p className="text-green-500 text-sm">
                    Extra 5% discount for Bkash
                  </p> */}
              {/* <p className="text-gray-400 line-through">
                    BDT {hotel.oldPrice}
                  </p> */}
              {/* <p className="text-lg font-bold">{hotel.newprice}</p> */}
              {/* <p className="text-[12px] text-gray-400 ">
                    for 1 night, per room
                  </p> */}

              {/* <Button
                    className="bg-yellow-500 text-white"
                    onClick={handleSelectHotel}
                  >
                    Select
                  </Button> */}
            </div>
          </CardContent>
        </Card>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100 dark:bg-background">
        <div className="sm:hidden bg-white flex justify-between items-end px-5 py-4">
          <div>
            {!showSection && (
              <div>
                <div>
                  <p className="font-bold text-blue-700">
                    {searchParams.get("location")}
                  </p>
                </div>

                <div className="flex h-5 items-center space-x-1 text-sm">
                  <p className="text-[10px]">
                    {format(date.from, "LLL dd, y")} to{" "}
                    {format(date.to, "LLL dd, y")}
                  </p>

                  <Separator orientation="vertical" />
                  <p className="text-[10px]">
                    {searchParams.get("rooms")} Room
                  </p>
                  <Separator orientation="vertical" />
                  <p className="text-[10px]">
                    {searchParams.get("totalGuset")} Guest
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-end">
            {isSmallScreen && (
              <Button onClick={() => setShowSection(!showSection)}>
                {showSection ? (
                  <>
                    <Icon
                      icon="iconoir:cancel"
                      className="font-bold text-4xl text-white"
                    />
                  </>
                ) : (
                  <>
                    <Icon
                      icon="tabler:edit"
                      className="font-bold text-4xl text-white"
                    />
                    Edit
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {showSection && (
          <div className="dark:bg-background bg-white sm:min-w-fit min-w-ful">
            <div className="flex justify-between sm:px-24 mb-4 sm:py-4 py-0 px-4 sm:space-y-0 space-y-2 pt-5 flex-col sm:flex-row">
              <div className="sm:mt-0 flex flex-col rounded-md sm:ml-4">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex flex-col dark:bg-gray-800 text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400"
                    >
                      <label className="text-[12px] text-blue-500  dark:text-white">
                        CITY/HOTEL/RESORT/AREA
                      </label>
                      <span>

                        <p>
                          {value
                            ? cities?.find(
                              (hotel) => hotel.name === value
                            )?.name
                            : "Select Destination..."}
                        </p>


                        <p className="flex text-[12px] text-gray-400">
                          {countryId === 1 ? "Bangladesh" : "USA"}
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
                          {cities?.map((hotel) => (
                            <CommandItem
                              key={hotel.id}
                              value={hotel.name}
                              onSelect={(currentValue) => {
                                const selectedHotel = cities?.find(h => h.name === currentValue);
                                setValue(currentValue === value ? "" : currentValue);
                                setHotelId(selectedHotel?.id || null);
                                setOpen(false);
                              }}
                            >
                              <span className="flex space-x-1">
                                <Icon
                                  icon="mdi:location"
                                  className="font-bold text-4xl text-black mt-2 dark:text-white"
                                />
                                <span>
                                  <p className="font-semibold ">
                                    {" "}
                                    {hotel.name}
                                  </p>
                                  <p className="text-[12px] text-gray-400">
                                    {hotel?.country_id === 1
                                      ? "Bangladesh"
                                      : "USA"}
                                  </p>
                                </span>
                              </span>
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === hotel.name
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
                      <label className="text-[12px] text-blue-500  dark:text-white">
                        CHECK IN
                      </label>

                      {date?.from ? (
                        <span>
                          <p className="flex">
                            {format(date.from, "LLL dd, y")}
                          </p>
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
                    <p className="text-center p-4">
                      Select check-in & check-out date
                    </p>
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
                  <label className="text-[12px] text-blue-500  dark:text-white">
                    CHECK OUT
                  </label>

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
                <Popover open={openRooms} onOpenChange={setOpenRooms}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex  dark:bg-gray-800 flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400 rounded-lg"
                      onClick={() => setOpenRooms(true)}
                    >
                      <label className="text-[12px] text-blue-500  dark:text-white">
                        ROOMS & GUESTS
                      </label>
                      <span>
                        <p>
                          <span className="text-blue-900 font-bold  dark:text-gray-200">
                            {totalTravelers.rooms}
                          </span>{" "}
                          Rooms,
                          <span className="text-blue-900 font-bold dark:text-gray-200 ">
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
                        <h4 className="font-bold text-blue-800  dark:text-gray-200">
                          Rooms
                        </h4>
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

                    <div className="mt-4 flex justify-end"
                    onClick={() => setOpenRooms(false)}
                    >
                      <Button color="primary">OK</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-center shadow-sm sm:h-20 h-12 mt-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-[#00026E] dark:text-primary dark:bg-gray-800  font-bold px-4 rounded-lg w-full"
                  onClick={() => handleModifySearch()}
                >
                  Modify Search
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-100 grid grid-cols-12 sm:gap-4 pt-5  dark:bg-background sm:px-24 px-4 pb-24">
          <aside className="hidden sm:block col-span-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
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
          <section className="col-span-12 sm:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{data?.rooms?.length} {categoryName} found</h2>
              {/* <select className="border p-2 rounded-md dark:bg-gray-800">
                <option>Popularity</option>
                <option>Price</option>
              </select> */}
            </div>
            {content}
          </section>
        </div>
      </div>
    </>
  );
}
