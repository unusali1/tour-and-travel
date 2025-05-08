import Header from "@/components/Navbar/Header";
import React, { useEffect, useState } from "react";
import visaBg from "../assets/visa.webp";
import successImg from "../assets/success.webp";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useVisaBookMutation } from "@/redux/hotels/hotelsApi";

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

const VisaDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const [open, setOpen] = useState();
  const [country, setCountry] = useState(slug);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [full_name, setFull_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passport_number, setPassport_Number] = useState(null);
  const [county_to_visit, setCounty_to_visit] = useState(slug);
  const [visa_type, setVisa_type] = useState(searchParams.get("visaType"));
  const [visa_duration, setVisa_duration] = useState(null);
  const [travel_dates, setTravel_dates] = useState(null);
  const [date_of_birth, setDate_of_birth] = useState(null);
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [showSucess, setShowSuccess] = useState(false);

  const [visaBook, { data, isLoading, isError }] = useVisaBookMutation();

  const handleSelect = (currentValue) => {
    setCountry((prev) => (currentValue === value ? "" : currentValue));
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      full_name: full_name,
      email: email,
      phone: phone,
      passport_number: "A12345673",
      county_to_visit: county_to_visit,
      visa_type: visa_type,
      visa_duration: "30 days",
      travel_dates: "2025-06-01 to 2025-06-30",
      date_of_birth: "1990-05-15",
      nationality: nationality,
      address: address,
    };

    visaBook(data);
 
  };

  useEffect(()=>{
    if(data?.application_id){
      setShowSuccess(true);
    }
  },[showSucess,data])



  return (
    <>
      <Header />
      <div className="mb-40">
        <img src={visaBg} alt="visa" className="w-full h-[50vh] object-cover" />

        {!showSucess ? (
          <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">
                Select your desired country
              </h2>
              <div className="flex justify-center gap-2 mt-2">
                <div className="mt-2  sm:mt-0 flex flex-col  p-2 rounded-md sm:ml-4">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="flex flex-col text-left items-start sm:w-[500px] w-full font-normal py-4 border border-gray-400"
                      >
                        <span>
                          <p className="text-blue-900 font-medium text-sm">
                            {country
                              ? countryName.find(
                                  (countryName) => countryName.value === country
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
                                onSelect={handleSelect}
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Check
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[20vh] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <div className="mb-6 p-4">
                    <h3 className="text-lg font-semibold">Summary</h3>
                    <p>
                      <strong>Visa Type:</strong> Tourist Visa (E-Visa)
                    </p>
                    <p>
                      <strong>Processing Time:</strong> 5-7 business days
                    </p>
                    <p>
                      <strong>Processing Fee:</strong> BDT 4,500
                    </p>
                  </div>

                  <div className="mb-6 p-4 ">
                    <h3 className="text-lg font-semibold">Important Notes</h3>
                    <ul className="list-disc pl-6 text-sm">
                      <li>Avoid booking tickets before confirmation.</li>
                      <li>Visa approval depends on the embassy.</li>
                      <li>Ensure documents are accurate.</li>
                      <li>Visa fees are non-refundable.</li>
                    </ul>
                  </div>

                  <div className="p-4 ">
                    <h3 className="text-lg font-semibold">
                      List of Documents Needed
                    </h3>
                    <ul className="list-disc pl-6 text-sm">
                      <li>Passport valid for at least 7 months.</li>
                      <li>Two recent passport-size photographs.</li>
                      <li>Bank statement of the last 6 months.</li>
                      <li>Other required documents based on applicant type.</li>
                    </ul>
                  </div>
                </div>

                {/* Right Sidebar - Visa Assistance Form */}
                <div className="p-6 border rounded-lg shadow-sm bg-gray-50 w-1/2">
                  <h3 className="text-lg font-semibold">
                    Request Visa Assistance
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Please share your contact information.
                  </p>
                  <form>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={full_name}
                      onChange={(e) => setFull_Name(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />

                    <input
                      type="text"
                      placeholder="Which Country want to go?"
                      value={county_to_visit}
                      onChange={(e) => setCounty_to_visit(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />

                    <input
                      type="text"
                      placeholder="Visa type"
                      value={visa_type}
                      onChange={(e) => setVisa_type(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />

                    <input
                      type="text"
                      placeholder="Nationality"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />

                    <input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      className="bg-yellow-500 text-white w-full p-2 rounded mt-10"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-52 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
              <div className="flex justify-center mb-4">
                <img
                  src={successImg}
                  alt="visa success"
                  className="w-32 h-32 object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Visa Application Successful
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your visa application. You can now
                track your status.
              </p>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-300"
              onClick={()=> navigate("/visaBooking")}
              >
                See Visa Application Status
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VisaDetails;
