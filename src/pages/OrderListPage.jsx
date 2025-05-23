import Header from "@/components/Navbar/Header";
import { useMyBookingQuery } from "@/redux/hotels/hotelsApi";
import React from "react";

const OrderListPage = () => {
  const { data, isError, isLoading } = useMyBookingQuery();
  
  let content = null;

  if (isLoading) {
    content = (
      <div class="flex items-center justify-center min-h-40">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (!isLoading && isError) {
    content = <p className="mt-12 text-center">Error Occured</p>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <p className="mt-12 text-center">No Booking room found</p>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data?.map((item) => {
      return (
        <div className="flex sm:flex-row flex-col items-center justify-between bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {item?.room?.room_images?.slice(0, 1).map((item, index) => (
              <img
                key={index}
                src={`https://backend.dayfuna.com/storage/${item}`}
                alt="Hotel"
                className="sm:w-36 sm:h-20 w-24 h-20 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              />
            ))}

            <div>
              <h2 className="text-lg font-medium text-gray-800">
                Order #12345
              </h2>
              <p className="text-sm text-gray-600">
                Room Type : {item?.room?.room_type}
              </p>
              <p className="text-sm text-gray-600">
                Total: {item?.room?.price_per_night}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full">
              Completed
            </span>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="min-h-screen p-6">
        <div className="container mx-auto p-8 rounded-lg  space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Room Booking List
          </h1>
          <div className="space-y-4">{content}</div>
        </div>
      </div>
    </>
  );
};

export default OrderListPage;
