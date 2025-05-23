import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logoWhite.png";
import { Icon } from "@iconify/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Navigation from "../Navbar/Navigation";
import HotDeals from "../Section/HotDeals";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { userLoggedOut } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useGetCitiesQuery } from "@/redux/hotels/hotelsApi";

const countries = [
  {
    id: 1,
    name: "Bangladesh",
    dollarRate: "120",
    icon: "twemoji:flag-bangladesh",
  },
  {
    id: 2,
    name: "USA",
    dollarRate: "0",
    icon: "la:flag-usa",
  },
];

const countryName = [
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "Bangladesh",
    label: "Bangladesh",
  },
];

const visaTypes = [
  {
    value: "Tourist",
    label: "Tourist",
  },
  {
    value: "Visit",
    label: "Visit",
  },

  {
    value: "Business",
    label: "Business",
  },

  {
    value: "Student",
    label: "Student",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("search") || "Hotel";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [roomsCount, setRommsCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("USA");
  const [visaType, setVisaType] = useState("Tourist");
  const [openVisaType, setOpenVisaType] = useState(false);
  const [active, setactive] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(1);
  const [value, setValue] = useState();
  const localAuth = localStorage?.getItem("auth");
  const auth = JSON.parse(localAuth);
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const [hotelId, setHotelId] = useState(null);
  const [openRooms, setOpenRooms] = useState(false);
  const { data: cities } = useGetCitiesQuery(selectedCountry);

  const [totalTravelers, setTotalTravelers] = useState({
    rooms: " ",
    adult: " ",
    child: " ",
    total: " ",
  });

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry");
    if (saved) {
      setSelectedCountry(parseInt(saved));
    } else {
      localStorage.setItem("selectedCountry", "1");
      setSelectedCountry(1);
    }
  }, []);

  const handleCountryChange = (value) => {
    localStorage.setItem("selectedCountry", value);
    setSelectedCountry(parseInt(value));
  };

  useEffect(() => {
    if (selectedCountry === 1) {
      setValue("Cox bazar");
      setHotelId(9);
    } else {
      setValue("New York");
      setHotelId(11);
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
      if (savedMode === "dark") {
        document.body.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleClose = (e) => {
    const target = e.target;
    if (target.id === "screen") {
      setOpenn(!openn);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactive(true);
      } else {
        setactive(false);
      }
    });
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/?search=${tab}`);
  };

  useEffect(() => {
    const currentTab = searchParams.get("search") || "Hotel";
    setActiveTab(currentTab);
  }, [searchParams]);

  useEffect(() => {
    if (activeTab === "Hotel") {
      setCategoryId(1);
      setCategoryName("Hotel");
    } else if (activeTab === "House Rent") {
      setCategoryId(2);
      setCategoryName("House");
    } else {
      setCategoryId(3);
      setCategoryName("Apartment");
    }
  }, [activeTab]);

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

  const handleSearch = () => {
    if (
      activeTab === "Hotel" ||
      activeTab === "House Rent" ||
      activeTab === "Apartment"
    ) {
      navigate(
        `/hotel/list?checkin=${date.from}0&checkout=${date.to}&location=${value}&rooms=${totalTravelers?.rooms}&adult=${totalTravelers?.adult}&child=${totalTravelers.child}&totalGuset=${totalTravelers.total}&hotelId=${hotelId}&categoryId=${categoryId}&categoryName=${categoryName}&sort=price `
      );
    } else {
      navigate(`/visa/${country}?visaType=${visaType}`);
    }
  };

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div
        className={`w-full sm:px-12 px-4 sm:min-h-[80px] min-h-12 transition-opacity fixed top-0 left-0 z-[9999] overflow-hidden ${
          active
            ? "bg-white text-black dark:bg-black dark:text-white shadow-lg"
            : " dark:text-white"
        }`}
      >
        <div className="hidden md:w-[90%] mx-auto md:flex items-center justify-between mt-4">
          <div>
            <Link href={"/"}>
              <div className="text-2xl font-extrabold text-blue-700">
                {active && isDarkMode ? (
                  <img src={logoWhite} alt="logo" className="h-10 mb-2 w-24" />
                ) : (
                  <img src={logo} alt="logo" className="h-10 mb-2 w-24" />
                )}
              </div>
            </Link>
          </div>
          {active ? (
            <div className="flex">
              <Navigation activeItem={0} />
            </div>
          ) : null}
          <div className="flex items-center ml-4">
            <div className="p-1 ml-2 mr-2">
              <Select
                value={String(selectedCountry)}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-[150px] border-none bg-gray-300 dark:bg-gray-700 shadow-none dark:text-white">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((item) => (
                      <SelectItem value={String(item.id)} key={item.id}>
                        <span className="flex space-x-2">
                          <Icon
                            icon={item.icon}
                            className="font-bold text-xl text-red-800 dark:text-white"
                          />
                          <span className="font-bold">{item.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className=" flex relative">
              <div className="flex items-center p-2 ">
                {auth?.user ? (
                  <Menubar className="!bg-transparent !p-0 !m-0 !border-none shadow-none">
                    <MenubarMenu className="!bg-transparent !p-0 !m-0 !border-none shadow-none">
                      <MenubarTrigger className="!bg-transparent !p-0 !m-0 !border-none shadow-none">
                        <Avatar>
                          <AvatarImage src={auth?.user?.img} alt="@shadcn" />
                          <AvatarFallback>
                            {auth?.user?.name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      </MenubarTrigger>
                      <MenubarContent className="mr-12">
                        <MenubarRadioGroup value="">
                          <MenubarRadioItem>
                            <Icon
                              icon="mdi:account-outline"
                              className="font-bold text-2xl text-black dark:text-white "
                            />
                            <span className="ml-3">Profile</span>
                          </MenubarRadioItem>
                          <MenubarRadioItem
                            value="benoit"
                            onClick={() => navigate("/hotel/my-booking-room")}
                          >
                            <Icon
                              icon="ic:round-hotel"
                              className="font-bold text-xl text-black dark:text-white "
                            />
                            <span className="ml-3">My Order</span>
                          </MenubarRadioItem>
                        </MenubarRadioGroup>

                        <MenubarSeparator />
                        <MenubarItem
                          inset
                          className="border bg-gray-500 text-white text-center flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
                          onClick={logout}
                        >
                          Logout
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                ) : (
                  <>
                    <Button
                      className="bg-blue-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => navigate("/auth")}
                    >
                      Sign In
                    </Button>

                    <Button
                      className="bg-yellow-700 text-white px-6 py-2 rounded-lg ml-3"
                      onClick={() =>
                        window.open("https://backend.dayfuna.com/login", "_blank")
                      }
                    >
                      Become a host
                    </Button>
                  </>
                )}
              </div>

              <div>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 bg-gray-200 dark:bg-gray-700 px-2 py-2 rounded-full mt-1"
                >
                  {isDarkMode ? (
                    <Icon
                      icon="material-symbols-light:dark-mode-rounded"
                      className="font-bold text-2xl text-white"
                    />
                  ) : (
                    <Icon
                      icon="uil:sun"
                      className="font-bold text-2xl text-black"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* for mobile screen */}
        <div className="md:hidden flex  justify-between overflow-hidden">
          <div className="mt-2 ">
            <Link href="/">
              <h1>
                <Link href={"/"}>
                  <div className="text-2xl font-extrabold text-blue-700">
                    {active && isDarkMode ? (
                      <img
                        src={logoWhite}
                        alt="logo"
                        className="h-6 mb-2 w-16"
                      />
                    ) : (
                      <img src={logo} alt="logo" className="h-6 mb-2 w-16" />
                    )}
                  </div>
                </Link>
              </h1>
            </Link>
          </div>
          <div className="flex ">
            <div className="mt-[5px]">
              <Select
                value={String(selectedCountry)}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-[120px] border-none bg-gray-300 dark:bg-gray-700 shadow-none dark:text-white">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((item) => (
                      <SelectItem value={String(item.id)} key={item.id}>
                        <span className="flex space-x-2">
                          <Icon
                            icon={item.icon}
                            className="font-bold text-lg dark:text-white text-red-800"
                          />
                          <span className="text-[10px]">{item.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <button
                onClick={toggleDarkMode}
                className="px-2 py-1  rounded-full mt-1"
              >
                {isDarkMode ? (
                  <Icon
                    icon="material-symbols-light:dark-mode-rounded"
                    className="font-bold text-xl text-white"
                  />
                ) : (
                  <Icon
                    icon="uil:sun"
                    className="font-bold text-xl text-black"
                  />
                )}
              </button>
            </div>

            <div className="mt-1" onClick={handleClose}>
              {openn ? (
                <Icon
                  onClick={() => setOpenn(!openn)}
                  icon="mingcute:close-fill"
                  className="font-bold text-3xl text-black dark:text-white"
                />
              ) : (
                <Icon
                  onClick={() => setOpenn(!openn)}
                  icon="ion:menu"
                  className="font-bold text-3xl text-black dark:text-white"
                />
              )}
            </div>
          </div>

          {openn && (
            <div
              className="fixed md:hidden w-full text-black h-screen top-0 right-0 z-[99999] bg-[unset]"
              onClick={handleClose}
              id="screen"
            >
              <div className="fixed bg-white h-screen top-0 left-0 w-[60%] z-[9999]">
                <div className="mt-0 p-5">
                  <div>
                    <div
                      className="flex justify-between text-2xl font-extrabold text-blue-700"
                      onClick={() => navigate("/")}
                    >
                      <img src={logo} alt="logo" className="h-10 mb-2 w-24" />
                    </div>

                    <Separator className="my-2" />
                  </div>
                  <Navigation activeItem={0} />
                  <div className="flex items-center p-2 ">
                    <div>
                      <Button
                        className="bg-blue-700 text-white px-5 py-2 rounded-md"
                        onClick={() => navigate("/auth")}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-blue-100 sm:min-h-96 min-h-96 flex items-center justify-center home">
          <div className="w-full sm:max-w-5xl relative flex justify-center sm:ml-0 sm:mr-0 ml-3 mr-3">
            <div className="flex border-b pb-3 justify-center absolute -top-4 dark:bg-gray-600/70 backdrop-blur-md  bg-white/50  px-10 py-5 rounded-xl sm:w-2/3 w-80">
              <div className="flex gap-6">
                <span
                  onClick={() => handleTabClick("Hotel")}
                  className={`cursor-pointer ${
                    activeTab === "Hotel"
                      ? "text-blue-600 dark:text-yellow-400 sm:font-semibold border-b-2 border-yellow-400 sm:pb-2 pb-1"
                      : "text-primary sm:font-semibold"
                  }`}
                >
                  <span className="flex sm:space-x-2 sm:flex-row flex-col justify-center items-center">
                    <Icon
                      icon="fluent-emoji-flat:hotel"
                      className="font-bold sm:text-xl text-lg text-black dark:text-white "
                    />
                    <span className="sm:text-md text-[14px]">Hotel</span>
                  </span>
                </span>

                <span
                  onClick={() => handleTabClick("House Rent")}
                  className={`cursor-pointer ${
                    activeTab === "House Rent"
                      ? "text-blue-600 dark:text-yellow-400 sm:font-semibold border-b-2 border-yellow-400 sm:pb-2 pb-1"
                      : "text-primary sm:font-semibold"
                  }`}
                >
                  <span className="flex sm:space-x-2 sm:flex-row flex-col justify-center items-center">
                    <Icon
                      icon="fluent-emoji-flat:house"
                      className="font-bold sm:text-xl text-lg text-black dark:text-white "
                    />
                    <span className="sm:hidden text-[14px]">H.Rent</span>
                    <span className="hidden sm:block sm:text-md text-[14px]">
                      House Rent
                    </span>
                  </span>
                </span>

                <span
                  onClick={() => handleTabClick("Apartment")}
                  className={`cursor-pointer ${
                    activeTab === "Apartment"
                      ? "text-blue-600 dark:text-yellow-400 sm:font-semibold border-b-2 border-yellow-400 sm:pb-2 pb-1"
                      : "text-primary sm:font-semibold"
                  }`}
                >
                  <span className="flex sm:space-x-2 sm:flex-row flex-col justify-center items-center">
                    <Icon
                      icon="tdesign:houses-1-filled"
                      className="font-bold sm:text-lg text-lg"
                      style={{ color: "rgb(255, 0, 0)" }}
                    />
                    <span className="sm:text-md text-[14px]">Apartment</span>
                  </span>
                </span>

                <span
                  onClick={() => handleTabClick("Visa")}
                  className={`cursor-pointer ${
                    activeTab === "Visa"
                      ? "text-blue-600 dark:text-yellow-400 sm:font-semibold border-b-2 border-yellow-400 sm:pb-2 pb-1"
                      : "text-primary sm:font-semibold"
                  }`}
                >
                  <span className="flex sm:space-x-2 sm:flex-row flex-col justify-center items-center">
                    <Icon
                      icon="mdi:passport"
                      className="font-bold sm:text-xl text-lg"
                      style={{ color: "rgb(255, 0, 0)" }}
                    />
                    <span className="sm:text-md text-[14px]">Visa</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-4 dark:bg-gray-600/90 bg-white/90  overflow-visible sm:min-w-fit min-w-full sm:p-6  px-6 rounded-2xl shadow-lg">
              {activeTab === "Hotel" && (
                <>
                  <div className="flex sm:mt-8 sm:mb-8 mt-14 mb-14 justify-between flex-col sm:flex-row">
                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400"
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
                                {selectedCountry === 1 ? "Bangladesh" : "USA"}
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
                                      const selectedHotel = cities?.find(
                                        (h) => h.name === currentValue
                                      );
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setHotelId(selectedHotel?.id || null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span className="flex space-x-1">
                                      <Icon
                                        icon="mdi:location"
                                        className="font-bold text-4xl text-black dark:text-white mt-2"
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

                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover
                        open={isPopoverOpen}
                        onOpenChange={setIsPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"ghost"}
                            className={cn(
                              "flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400",
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

                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Button
                        id="date"
                        variant={"ghost"}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        className={cn(
                          "flex flex-col items-start text-left sm:w-[240px] w-full font-normal py-10 border border-gray-400",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <label className="text-[12px] text-blue-500  dark:text-white">
                          CHECK OUT
                        </label>

                        {date?.to ? (
                          <span>
                            <p className="flex">
                              {format(date.to, "LLL dd, y")}
                            </p>
                            <p className="flex text-[12px] text-gray-400">
                              {date.toDayName}
                            </p>
                          </span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </div>

                    <div className=" mt-2 sm:mt-0 flex flex-col p-2 rounded-md sm:ml-4">
                      <Popover open={openRooms} onOpenChange={setOpenRooms}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400 rounded-lg"
                            onClick={()=>setOpenRooms(true)}
                          >
                            <label className="text-[12px] text-blue-500  dark:text-white">
                              ROOMS & GUESTS
                            </label>
                            <span>
                              <p>
                                <span className="text-blue-900 dark:text-gray-200 font-bold ">
                                  {totalTravelers.rooms}
                                </span>{" "}
                                Rooms,
                                <span className="text-blue-900 dark:text-gray-200 font-bold ">
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
                                onClick={() =>
                                  handleRommsCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{roomsCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleRommsCountChange("increase")
                                }
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
                                onClick={() =>
                                  handleAdultCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{adultCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleAdultCountChange("increase")
                                }
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
                                onClick={() =>
                                  handleChildCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{childCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleChildCountChange("increase")
                                }
                                variant="oulined"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <Separator className="my-4" />

                          <div className="mt-4 flex justify-end"
                          onClick={()=>setOpenRooms(false)}
                          >
                            <Button color="primary">OK</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "House Rent" && (
                <>
                  <div className="flex sm:mt-8 sm:mb-8 mt-14 mb-14 justify-between flex-col sm:flex-row">
                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400"
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
                                {selectedCountry === 1 ? "Bangladesh" : "USA"}
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
                                      const selectedHotel = cities?.find(
                                        (h) => h.name === currentValue
                                      );
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setHotelId(selectedHotel?.id || null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span className="flex space-x-1">
                                      <Icon
                                        icon="mdi:location"
                                        className="font-bold text-4xl text-black dark:text-white mt-2"
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

                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover
                        open={isPopoverOpen}
                        onOpenChange={setIsPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"ghost"}
                            className={cn(
                              "flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400",
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

                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Button
                        id="date"
                        variant={"ghost"}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        className={cn(
                          "flex flex-col items-start text-left sm:w-[240px] w-full font-normal py-10 border border-gray-400",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <label className="text-[12px] text-blue-500  dark:text-white">
                          CHECK OUT
                        </label>

                        {date?.to ? (
                          <span>
                            <p className="flex">
                              {format(date.to, "LLL dd, y")}
                            </p>
                            <p className="flex text-[12px] text-gray-400">
                              {date.toDayName}
                            </p>
                          </span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </div>

                    <div className=" mt-2 sm:mt-0 flex flex-col p-2 rounded-md sm:ml-4">
                      <Popover open={openRooms} onOpenChange={setOpenRooms}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400 rounded-lg"
                            onClick={()=>setOpenRooms(true)}
                          >
                            <label className="text-[12px] text-blue-500  dark:text-white">
                              ROOMS & GUESTS
                            </label>
                            <span>
                              <p>
                                <span className="text-blue-900 dark:text-gray-200 font-bold ">
                                  {totalTravelers.rooms}
                                </span>{" "}
                                Rooms,
                                <span className="text-blue-900 dark:text-gray-200 font-bold ">
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
                                onClick={() =>
                                  handleRommsCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{roomsCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleRommsCountChange("increase")
                                }
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
                                onClick={() =>
                                  handleAdultCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{adultCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleAdultCountChange("increase")
                                }
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
                                onClick={() =>
                                  handleChildCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{childCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleChildCountChange("increase")
                                }
                                variant="oulined"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <Separator className="my-4" />

                          <div className="mt-4 flex justify-end"
                          onClick={()=>setOpenRooms(false)}
                          >
                            <Button color="primary">OK</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Apartment" && (
                <>
                  <div className="flex sm:mt-8 sm:mb-8 mt-14 mb-14 justify-between flex-col sm:flex-row">
                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400"
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
                                {selectedCountry === 1 ? "Bangladesh" : "USA"}
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
                                      const selectedHotel = cities?.find(
                                        (h) => h.name === currentValue
                                      );
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setHotelId(selectedHotel?.id || null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span className="flex space-x-1">
                                      <Icon
                                        icon="mdi:location"
                                        className="font-bold text-4xl text-black dark:text-white mt-2"
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

                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover
                        open={isPopoverOpen}
                        onOpenChange={setIsPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"ghost"}
                            className={cn(
                              "flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400",
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

                    <div className="mt-2 sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Button
                        id="date"
                        variant={"ghost"}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        className={cn(
                          "flex flex-col items-start text-left sm:w-[240px] w-full font-normal py-10 border border-gray-400",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <label className="text-[12px] text-blue-500  dark:text-white">
                          CHECK OUT
                        </label>

                        {date?.to ? (
                          <span>
                            <p className="flex">
                              {format(date.to, "LLL dd, y")}
                            </p>
                            <p className="flex text-[12px] text-gray-400">
                              {date.toDayName}
                            </p>
                          </span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </div>

                    <div className=" mt-2 sm:mt-0 flex flex-col p-2 rounded-md sm:ml-4">
                      <Popover open={openRooms} onOpenChange={setOpenRooms}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[240px] w-full font-normal py-10 border border-gray-400 rounded-lg"
                            onClick={()=> setOpenRooms(true)}
                          >
                            <label className="text-[12px] text-blue-500  dark:text-white">
                              ROOMS & GUESTS
                            </label>
                            <span>
                              <p>
                                <span className="text-blue-900 dark:text-gray-200 font-bold ">
                                  {totalTravelers.rooms}
                                </span>{" "}
                                Rooms,
                                <span className="text-blue-900 dark:text-gray-200 font-bold ">
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
                                onClick={() =>
                                  handleRommsCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{roomsCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleRommsCountChange("increase")
                                }
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
                                onClick={() =>
                                  handleAdultCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{adultCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleAdultCountChange("increase")
                                }
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
                                onClick={() =>
                                  handleChildCountChange("decrease")
                                }
                                variant="oulined"
                              >
                                -
                              </Button>
                              <p className="ml-4 mt-2">{childCount}</p>
                              <Button
                                className="ml-4 border border-gray-200 rounded-full"
                                onClick={() =>
                                  handleChildCountChange("increase")
                                }
                                variant="oulined"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <Separator className="my-4" />

                          <div className="mt-4 flex justify-end"
                          onClick={()=>setOpenRooms(false)}
                          >
                            <Button color="primary">OK</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Visa" && (
                <>
                  <div className="flex sm:mt-8 sm:mb-8 mt-14 mb-14 justify-between flex-col sm:flex-row">
                    <div className="mt-2  sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[500px] w-full font-normal py-10 border border-gray-400"
                          >
                            <label className="text-[12px] text-blue-500">
                              COUNTRY
                            </label>
                            <span>
                              <p className="text-blue-900 font-semibold text-lg">
                                {country
                                  ? countryName.find(
                                      (countryName) =>
                                        countryName.value === country
                                    )?.label
                                  : "Select Destination..."}
                              </p>
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[500px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Destination..." />
                            <CommandList>
                              <CommandEmpty>No Destination found.</CommandEmpty>
                              <CommandGroup>
                                {countryName.map((country) => (
                                  <CommandItem
                                    key={country.value}
                                    value={country.value}
                                    onSelect={(currentValue) => {
                                      setCountry(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    {country.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        value === country.value
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

                    <div className="mt-2  sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                      <Popover
                        open={openVisaType}
                        onOpenChange={setOpenVisaType}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="flex flex-col text-left items-start sm:w-[500px] w-full font-normal py-10 border border-gray-400"
                          >
                            <label className="text-[12px] text-blue-500">
                              Visa Type
                            </label>
                            <span>
                              <p className="text-blue-900 font-semibold text-lg">
                                {visaType
                                  ? visaTypes.find(
                                      (visa) => visa.value === visaType
                                    )?.label
                                  : "Select visa type..."}
                              </p>
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[500px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Destination..." />
                            <CommandList>
                              <CommandEmpty>No Destination found.</CommandEmpty>
                              <CommandGroup>
                                {visaTypes.map((visa) => (
                                  <CommandItem
                                    key={visa.value}
                                    value={visa.value}
                                    onSelect={(currentValue) => {
                                      setVisaType(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpenVisaType(false);
                                    }}
                                  >
                                    {visa.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        value === visa.value
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
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-center shadow-sm absolute -bottom-6 p-2 w-48 h-20">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-primary dark:bg-gray-800/50 backdrop-blur-md   font-bold py-2 px-6 rounded-lg mt-4 w-full"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <HotDeals
          date={date}
          guest={totalTravelers?.total}
          categoryId={categoryId}
        />
        {/* <SpecialOffer /> */}
      </div>
    </>
  );
};

export default HomePage;
