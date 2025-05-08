import Header from "@/components/Navbar/Header";
import { useMyVisaQuery } from "@/redux/hotels/hotelsApi";
import React from "react";


import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Icon } from "@iconify/react";

const VisaBooking = () => {
  const { data, isLoading, isError } = useMyVisaQuery();

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center min-h-40">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (!isLoading && isError) {
    content = <p className="mt-12 text-center">Error Occured</p>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <p className="mt-12 text-center">No Visa Applications found</p>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data?.map((item) => {
      return (
        <div className="flex sm:flex-row flex-col items-center justify-between bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                Name : {item?.full_name}
              </h2>
              <p className="text-sm text-gray-600">
                Application Country : {item?.county_to_visit}
              </p>
              <p className="text-sm text-gray-600">Email : {item?.email}</p>

              <p className="text-sm text-gray-600">Phone : {item?.phone}</p>

              <p className="text-sm text-gray-600">
                Nationality : {item?.nationality}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-full">
              {item?.status}
            </span>
          </div>
        </div>
      );
    });
  }

  return (
    <>
    <Header />
    <div className="min-h-screen dark:bg-gray-900 py-12 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <Tabs defaultValue="pending">
          {/* Header and Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-800 dark:text-white">
            <Icon icon={"mdi:passport"} width={24} height={24} />
            <h2 className="text-2xl font-semibold">Visa Applications</h2>
          </div>
            <TabsList className="flex gap-2 mt-4 sm:mt-0 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
              <TabsTrigger
                value="pending"
                className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow data-[state=active]:text-black dark:data-[state=active]:text-white"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="proccessing"
                className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow data-[state=active]:text-black dark:data-[state=active]:text-white"
              >
                Processing
              </TabsTrigger>
              <TabsTrigger
                value="complete"
                className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow data-[state=active]:text-black dark:data-[state=active]:text-white"
              >
                Complete
              </TabsTrigger>
            </TabsList>
          </div>
  
          {/* Tab Content: Pending */}
          <TabsContent value="pending">
            <div className="space-y-4">
              {content ? (
                content
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10 border rounded-md">
                  No pending visa applications.
                </div>
              )}
            </div>
          </TabsContent>
  
          {/* Tab Content: Processing */}
          <TabsContent value="proccessing">
            <div className="text-center text-gray-500 dark:text-gray-400 py-10 border rounded-md">
              No applications are currently being processed.
            </div>
          </TabsContent>
  
          {/* Tab Content: Complete */}
          <TabsContent value="complete">
            <div className="text-center text-gray-500 dark:text-gray-400 py-10 border rounded-md">
              No completed visa applications found.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </>
  

  );
};

export default VisaBooking;
