import Header from "@/components/Navbar/Header";
import React from "react";

const BookingPage = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 dark:bg-background min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold mb-2">Review Your Booking</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold">
                Sea Pearl Beach Resort & Spa Cox's Bazar
              </h3>
              <p className="text-gray-600 dark:text-gray-400">2 Guests | 1 Room</p>

              <div className="flex justify-between my-4 text-md">
                <div>
                  <p >
                    Check In: <strong>14:00</strong>
                  </p>
                  <p className="font-medium">27 Feb, 2025</p>
                </div>
                <div>
                  <p>
                    Check Out: <strong>11:00</strong>
                  </p>
                  <p className="font-medium">28 Feb, 2025</p>
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
              {[1, 2].map((guest) => (
                <div key={guest}>
                  <p className="font-medium">Guest {guest} (Adult)</p>
                  <input
                    type="text"
                    placeholder="Given Name"
                    className="border  dark:bg-gray-600 rounded-lg w-full p-3 mt-1"
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    className="  dark:bg-gray-600 border rounded-lg w-full p-3 mt-1"
                  />
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Primary Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="border rounded-lg w-full p-3  dark:bg-gray-600">
                <option>Select Primary Contact</option>
              </select>
              <input
                type="text"
                placeholder="+880 1XXX XXXXXXX"
                className="border  dark:bg-gray-600 rounded-lg w-full p-3"
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
            />

            <button className="bg-yellow-400 text-white w-full py-4 rounded-lg mt-6 font-medium">
              Confirm Booking
            </button>
          </div>

          <div className="bg-white  dark:bg-gray-800 h-80 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">Fare Summary</h3>
            <p>
              Rack Rate: <span className="line-through">BDT 14,230</span>
            </p>
            <p>
              Hotel Offer: <span className="text-green-500">33%</span>{" "}
              <strong>BDT 4,832</strong>
            </p>
            <p>
              Room Rate: <strong>BDT 9,398</strong>
            </p>
            <p>
              Taxes & Fees: <strong>BDT 2,490</strong>
            </p>
            <button className="bg-blue-600 text-white w-full py-4 rounded-lg mt-6 font-medium">
              Pay Now BDT 11,888
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
