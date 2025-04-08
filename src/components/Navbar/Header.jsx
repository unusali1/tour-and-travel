"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logoWhite.png";
import { Separator } from "../ui/separator";
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
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/auth/authSlice";

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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setactive] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const localAuth = localStorage?.getItem("auth");
  const auth = JSON.parse(localAuth);

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry");
    if (saved) {
      setSelectedCountry(parseInt(saved));
    }
  }, []);

  const handleCountryChange = (value) => {
    localStorage.setItem("selectedCountry", value);
    setSelectedCountry(parseInt(value));
  };

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setactive(true);
        } else {
          setactive(false);
        }
      });
    }
  }, []);

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    window.location.reload();
    navigate("/")
  };

  return (
    <div
      className={`w-full sm:px-12 px-4 shadow-sm dark:border-b sm:min-h-[80px] min-h-12 transition-opacity  top-0 left-0 z-[9999] ${active
        ? "bg-white text-black fixed dark:bg-black dark:text-white shadow-lg"
        : "text-black dark:text-white"
        }`}
    >
      <div className="hidden md:w-[90%] mx-auto md:flex items-center justify-between mt-4">
        <div>
          <div className="text-2xl font-extrabold text-blue-700" onClick={() => navigate("/")}>
            {isDarkMode ? (
              <img src={logoWhite} alt="logo" className="h-10 mb-2 w-24" />
            ) : (
              <img src={logo} alt="logo" className="h-10 mb-2 w-24" />
            )}
          </div>
        </div>
        <div className="flex">
          <Navigation activeItem={0} />
        </div>
        <div className="flex items-center ml-4">
          {/* <div className="p-1 ml-2 mr-2">
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
                          className="font-bold text-xl text-black dark:text-white"
                        />
                        <span className="font-bold">{item.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}

          <div className="flex relative">
            <div className="flex items-center p-2 ">
              {auth?.user ? (
                <Menubar className="!bg-transparent !p-0 !m-0 !border-none shadow-none">
                  <MenubarMenu className="!bg-transparent !p-0 !m-0 !border-none shadow-none">
                    <MenubarTrigger className="!bg-transparent !p-0 !m-0 !border-none shadow-none">
                      <Avatar>
                        <AvatarImage src={auth?.user?.img} alt="@shadcn" />
                        <AvatarFallback>{auth?.user?.name?.[0]}</AvatarFallback>
                      </Avatar>
                    </MenubarTrigger>
                    <MenubarContent className="mr-12">
                      <MenubarRadioGroup value="">
                        <MenubarRadioItem value="andy">
                          <Icon
                            icon="mdi:account-outline"
                            className="font-bold text-2xl text-black dark:text-white "
                          />
                          <span className="ml-3">
                            Profile
                          </span>

                        </MenubarRadioItem>
                        <MenubarRadioItem value="benoit" onClick={() => navigate("/hotel/my-booking-room")}>
                          <Icon
                            icon="ic:round-hotel"
                            className="font-bold text-xl text-black dark:text-white "
                          />
                          <span className="ml-3">
                            My Order
                          </span>
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
                <Button
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
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
      <div className="w-full md:hidden flex items-center justify-between -top-2 overflow-hidden">
        <div className="mt-2 ml-2">
          <Link href="/">
            <h1>
              <Link href={"/"}>
                <div className="text-2xl font-extrabold text-blue-700">
                  {isDarkMode ? (
                    <img src={logoWhite} alt="logo" className="h-6 mb-2 w-16" />
                  ) : (
                    <img src={logo} alt="logo" className="h-6 mb-2 w-16" />
                  )}
                </div>
              </Link>
            </h1>
          </Link>
        </div>
        <div className="flex ">
          <div className="mt-[2px]">
            <Select
              value={selectedCountry}
              className="text-black bg-black border-none"
              onValueChange={(value) => {
                setSelectedCountry(value);
              }}
            >
              <SelectTrigger className="w-[100px] border-none shadow-none dark:text-white">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="BDT">
                    <span className="flex space-x-2">
                      <Icon
                        icon="twemoji:flag-bangladesh"
                        className="font-bold text-xl text-black dark:text-white "
                      />
                      <span>BDT</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="USA">
                    <span className="flex space-x-2">
                      <Icon
                        icon="la:flag-usa"
                        className="font-bold text-xl text-black dark:text-white "
                      />{" "}
                      <span>USA</span>
                    </span>
                  </SelectItem>
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
                  <Link href={"/"}>
                    <div className="flex justify-between text-2xl font-extrabold text-blue-700">
                      <img src={logo} alt="logo" className="h-10 mb-2 w-24" />
                      <Icon
                        onClick={() => setOpenn(!openn)}
                        icon="mingcute:close-fill"
                        className="font-bold text-3xl text-black dark:text-white"
                      />
                    </div>
                  </Link>
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
  );
};

export default Header;
