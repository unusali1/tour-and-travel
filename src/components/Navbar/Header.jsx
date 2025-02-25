"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const navigate = useNavigate();
  const [active, setactive] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("BDT");
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handlePhoneChange = (e) => {
    setSelectedPhone(e.target.value);
  };

  return (
    <div
      className={`w-full sm:px-12 px-4 shadow-sm sm:min-h-[80px] min-h-12 transition-opacity  top-0 left-0 z-[9999] ${
        active
          ? "bg-white text-black fixed dark:bg-black dark:text-white shadow-lg"
          : "text-black dark:text-white"
      }`}
    >
      <div className="hidden md:w-[90%] mx-auto md:flex items-center justify-between mt-4">
        <div>
          <div
            className="text-2xl font-extrabold text-blue-700"
            onClick={() => navigate("/")}
          >
            Gozayaan
          </div>
        </div>
        <div className="flex">
          <Navigation activeItem={0} />
        </div>
        <div className="flex items-center ml-4">
          <div className="p-1 ml-2 mr-2">
            <Select
              value={selectedCountry}
              className="text-black bg-black border-none"
              onValueChange={(value) => {
                setSelectedCountry(value);
              }}
            >
              <SelectTrigger className="w-[100px] border-none text-black dark:text-white ">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="BDT">BDT</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex relative">
            <div className="flex items-center p-2 ">
              <Button
                className="bg-blue-700 text-white px-6 py-2 rounded-lg"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
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
                <div className="text-lg font-semibold text-blue-700">
                  Gozayaan
                </div>
              </Link>
            </h1>
          </Link>
        </div>
        <div className="mr-4 mt-2">
          <Icon
            onClick={() => setOpenn(!openn)}
            icon="ic:round-menu"
            className="font-bold text-2xl text-black"
          />
        </div>

        {openn && (
          <div
            className="fixed md:hidden w-full text-black h-screen top-0 right-0 z-[99999] bg-[unset]"
            onClick={handleClose}
            id="screen"
          >
            <div className="fixed bg-white h-screen top-0 left-0 w-[50%] z-[9999]">
              <div className="mt-20 p-5">
                <Navigation activeItem={0} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
