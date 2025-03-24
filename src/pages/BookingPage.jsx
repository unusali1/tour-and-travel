import Header from "@/components/Navbar/Header";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation, useRegisterMutation } from "@/redux/auth/authApi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useHotelBookMutation } from "@/redux/hotels/hotelsApi";

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const price = searchParams.get("price");
  const check_in = searchParams.get("checkin")
  const check_out = searchParams.get("checkout")
  const totalGuest = searchParams.get("guests")
  const hotelName = searchParams.get("hotelName");
  const roomName = searchParams.get("roomName");
  const city_id = 9
  const category_id = 2
  const country_id = 1
  const capacity = 2

  const checkInDate = check_in ? new Date(check_in) : null;
  const checkOutDate = check_out ? new Date(check_out) : null;

  const [phone, setPhone] = useState();
  const [note, setNote] = useState();

  const [isSignUp, setIsSignUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [proccedToPayment, setProccedToPayment] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });


  const localAuth = localStorage?.getItem("auth");
  const auth = JSON.parse(localAuth);

  const [register, { data, isLoading, error: responseError }] = useRegisterMutation();
  const [login, { data: dataLogin, isLoading: loadingLogin, error: responseErrorLogin }] = useLoginMutation();
  const [hotelBook, { data: hotelBookData, isLoading: loadingHotelBook, error: responseErrorHotelBook }] = useHotelBookMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (isSignUp && !name.trim()) newErrors.name = "Name is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (isSignUp && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (responseErrorLogin?.data) {
      setErrorMsg("Email or Password Incorrect")
    }
  }, [dataLogin, data, responseErrorLogin, navigate]);


  const handleSubmit = (e) => {
    setErrorMsg("");
    e.preventDefault();
    if (!validateForm()) return;

    if (isSignUp) {
      register({
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      });
    } else {
      login({
        email,
        password
      });
      setOpen(false);
    }
  };


  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };


  // Format time (e.g., "02:16 PM")
  const formatTime = (date) =>
    date?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) || "N/A";

  // Format date (e.g., "27 Feb, 2025")
  const formatDate = (date) =>
    date?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) || "N/A";


  const handleConfimation = () => {
    if ((dataLogin?.token && dataLogin?.user) || (data?.token && data?.user) || auth?.user?.name) {
      const checkIn = formatDate(checkInDate);
      const checkOut = formatDate(checkOutDate);
      hotelBook({
        room_id: 1,
        hotel_id: 1,
        check_in: checkIn,
        check_out: checkOut,
        number_of_guests: totalGuest,
        note: note,
        phone: phone
      })
      setProccedToPayment(true);
    } else {
      setOpen(true);
    }
  }


  return (
    <>
      <Header />
      {
        proccedToPayment ? (
          <div>
            <div className="bg-gray-100 dark:bg-background min-h-screen p-4 md:p-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-xl font-bold mb-2">Review Your Booking</h2>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">
                      {hotelName} - {roomName} Room
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{totalGuest} Guests</p>

                    <div className="flex justify-between my-4 text-md">
                      <div>
                        <p >
                          Check In: <strong>{formatTime(checkInDate)}</strong>
                        </p>
                        <p className="font-medium">{formatDate(checkInDate)}</p>
                      </div>
                      <div>
                        <p>
                          Check Out: <strong>{formatTime(checkOutDate)}</strong>
                        </p>
                        <p className="font-medium">{formatDate(checkOutDate)}</p>
                      </div>
                      <p className="bg-blue-100 text-blue-600 px-4 py-1 rounded-lg h-fit">
                        1 Night
                      </p>
                    </div>

                    <div className="bg-blue-50  dark:bg-gray-600 p-4 rounded-lg">
                      <p className="font-medium">Superior King Hill / Garden View</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Room Only • No breakfast included • Non-refundable
                      </p>
                    </div>
                  </div>

                  <a href="#" className="text-blue-600 underline">
                    Have a coupon?
                  </a>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Guest Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: totalGuest }, (_, i) => i + 1).map((guest, index) => (
                      <div key={guest}>
                        <p className="font-medium">Guest {index + 1} (Adult)</p>
                        <input
                          type="text"
                          placeholder="Given Name"
                          className="border  dark:bg-gray-600 rounded-lg w-full p-3 mt-1"
                        />
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      placeholder="+880 1XXX XXXXXXX"
                      required
                      className="border  dark:bg-gray-600 rounded-lg w-full p-3"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">
                    Additional Requests
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Airport Transfer",
                      "Extra Bed",
                      "Room On a Higher Floor",
                      "Decorations in Room",
                    ].map((request) => (
                      <label key={request} className="flex items-center">
                        <input type="checkbox" className="mr-2" /> {request}
                      </label>
                    ))}
                  </div>

                  <h4 className="text-lg font-medium mt-4">Bed Type</h4>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="bed" className="mr-2" /> Large Bed
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="bed" className="mr-2" /> Twin Beds
                    </label>
                  </div>

                  <h4 className="text-lg font-medium mt-4">Room Preference</h4>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="room" className="mr-2" /> Non-Smoking
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="room" className="mr-2" /> Smoking
                    </label>
                  </div>

                  <textarea
                    placeholder="Leave a Note for The Property"
                    className="border rounded-lg w-full p-3 mt-4 dark:bg-gray-600"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                  />

                  <button className="bg-yellow-400 text-white w-full py-4 rounded-lg mt-6 font-medium" onClick={() => handleConfimation()}>
                    Confirm Booking
                  </button>
                </div>

                <div className="bg-white  dark:bg-gray-800 h-80 rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-6">Fare Summary</h3>
                  {/* <p>
              Rack Rate: <span className="line-through">BDT 14,230</span>
            </p>
            <p>
              Hotel Offer: <span className="text-green-500">33%</span>{" "}
              <strong>BDT 4,832</strong>
            </p> */}
                  <p>
                    Room Rate: <strong>{price}</strong>
                  </p>
                  <p>
                    Taxes & Fees: <strong>BDT 0</strong>
                  </p>
                  <button className="bg-blue-600 text-white w-full py-4 rounded-lg mt-6 font-medium">
                    Pay Now {price}
                  </button>
                </div>
              </div>
            </div>


            <Dialog open={open} onOpenChange={setOpen}>
              {/* <DialogTrigger >
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                </DialogHeader>
                <div className="grid gap-4 py-4 ">
                  <div className="flex sm:px-0 px-2 dark:bg-background">
                    <div className="bg-white sm:w-full w-full dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
                      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                        {isSignUp ? "Create Account" : "Welcome Back"}
                      </h2>
                      {
                        errorMsg && !isSignUp && (
                          <Alert variant="destructive" className="mb-4">
                            {/* <AlertCircle className="h-4 w-4" /> */}
                            {/* <AlertTitle>Error</AlertTitle> */}
                            <AlertDescription>
                              {errorMsg}
                            </AlertDescription>
                          </Alert>

                        )
                      }
                      <form className="space-y-6" onSubmit={handleSubmit}>

                        {isSignUp && (
                          <div className="relative">
                            <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                              <Icon
                                icon="mingcute:phone-fill"
                                className="font-bold text-2xl text-gray-400"
                              />
                            </div>
                            <Input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your Name"
                              className="w-full rounded-lg bg-background px-12 py-6"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                          </div>
                        )}

                        <div className="relative">
                          <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                            <Icon
                              icon="mdi:email"
                              className="font-bold text-2xl text-gray-400"
                            />
                          </div>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg bg-background px-12 py-6"
                          />
                          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>



                        <div className="relative">
                          <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                            <Icon
                              icon="ri:lock-password-fill"
                              className="font-bold text-2xl text-gray-400"
                            />
                          </div>
                          <Input
                            id="password"
                            type={showPassword.password ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg bg-background px-12 py-6"
                          />
                          <div className="absolute right-4 top-3.5 h-4 w-4 text-muted-foreground">
                            <Icon
                              onClick={() => togglePasswordVisibility("password")}
                              icon={
                                showPassword.password ? "eva:eye-fill" : "eva:eye-off-fill"
                              }
                              className="font-bold text-2xl text-gray-400 cursor-pointer"
                            />
                          </div>
                          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {isSignUp && (
                          <div className="relative">
                            <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                              <Icon
                                icon="ri:lock-password-fill"
                                className="font-bold text-2xl text-gray-400"
                              />
                            </div>
                            <Input
                              id="confirm-password"
                              type={showPassword.confirmPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full rounded-lg bg-background px-12 py-6"
                            />
                            <div className="absolute right-4 top-3.5 h-4 w-4 text-muted-foreground">
                              <Icon
                                onClick={() => togglePasswordVisibility("confirmPassword")}
                                icon={
                                  showPassword.confirmPassword
                                    ? "eva:eye-fill"
                                    : "eva:eye-off-fill"
                                }
                                className="font-bold text-2xl text-gray-400 cursor-pointer"
                              />
                            </div>
                            {errors.confirmPassword && (
                              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                            )}
                          </div>
                        )}

                        {
                          loadingLogin ? (
                            <button
                              type="submit"
                              className="w-full bg-[#00026E] dark:bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                            >
                              Loading....
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="w-full bg-[#00026E] dark:bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                            >
                              {isSignUp ? "Sign Up" : "Sign In"}
                            </button>
                          )
                        }



                        {!isSignUp && (
                          <div className="flex justify-center items-center space-x-1">
                            <Separator className="my-2 w-48 dark:bg-gray-400" />
                            <p className="text-gray-400 text-sm">OR</p>
                            <Separator className="my-2 w-48 dark:bg-gray-400" />
                          </div>
                        )}

                        {!isSignUp && (
                          <button
                            type="button"
                            className="flex space-x-3 justify-center w-full bg-white dark:bg-gray-600 text-gray-500 border p-3 rounded-lg font-semibold transition duration-300"
                          >
                            <Icon
                              icon="devicon:google"
                              className="font-bold text-2xl text-gray-400"
                            />
                            <p className="dark:text-white text-sm">Login With Google</p>
                          </button>
                        )}
                      </form>

                      <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <span
                          onClick={toggleForm}
                          className="text-blue-500 dark:text-yellow-400 ml-2 cursor-pointer hover:underline"
                        >
                          {isSignUp ? "Sign In" : "Sign Up"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/4 bg-gray-50 p-4 border-r">
                <ul className="space-y-2">
                  {[
                    "Credit/Debit Card",
                    "bKash",
                    "upay",
                    "Nagad",
                    "Tap",
                    "Rocket",
                    "Net Banking",
                    "EMI on credit card",
                    "International Payment",
                  ].map((method, index) => (
                    <li
                      key={index}
                      className={`p-2 text-sm rounded-lg cursor-pointer ${method === "bKash" ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500" : "hover:bg-gray-200"
                        }`}
                    >
                      {method}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Section */}
              <div className="w-1/2 p-6 text-center">
                <h2 className="text-lg font-semibold mb-4">
                  You will be directed to the bKash platform where you can complete your
                  purchase.
                </h2>
                <div className="flex justify-center my-4">
                  {/* <img src="/gozayaan-bkash.png" alt="GoZayaan to bKash" className="h-12" /> */}
                </div>
                <p className="text-sm text-gray-600">
                  By continuing to pay, I understand and agree with the
                  <a href="#" className="text-blue-500"> privacy policy</a> and
                  <a href="#" className="text-blue-500"> terms of service</a> of Dayfuna.
                </p>
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold mt-6">
                  Proceed to Payment
                </button>
                <p className="mt-2 text-gray-700 font-semibold">You Pay: {price}</p>
              </div>

              {/* Summary Section */}
              <div className="w-1/4 p-4 bg-gray-50 border-l">
                <div className="p-3 bg-blue-100 rounded-md text-blue-700 text-sm mb-4">
                  Booking confirmed. Complete payment before timeout.
                  <div className="font-semibold text-lg mt-2">⏳ 19:18 min</div>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-blue-600 font-semibold">{hotelName}</h3>
                  <p className="text-sm text-gray-500">{roomName}</p>
                  <div className="mt-4 border-t pt-2">
                    <p className="text-gray-700 text-sm">{formatDate(checkInDate)}</p>
                    <p className="text-gray-700 text-sm">{formatDate(checkOutDate)}</p>
                    <p className="text-gray-700 text-sm">Superior King Hill/ Garden View {totalGuest} Adults</p>
                  </div>
                
                  <div className="mt-4 border-t pt-2">
                    {/* <p className="text-sm text-gray-700">Rack Rate: BDT 14,230</p>
                    <p className="text-sm text-green-600">Hotel Offer (62% Off): BDT 8,854</p> */}
                    <p className="text-sm text-gray-700">Room Rate: BDT {price}</p>
                    <p className="text-sm text-gray-700">Taxes & Fees: BDT 0</p>
                    {/* <p className="text-sm text-green-600">Hot Deals (STAYB0325): BDT 268</p> */}
                  </div>
                  <button className="bg-blue-600 text-white w-full py-3 mt-4 rounded-lg font-semibold">
                    Pay Now BDT {price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
};

export default BookingPage;
