import Header from '@/components/Navbar/Header'
import React, { useState } from 'react'
import visaBg from "../assets/visa.webp"

const VisaDetails = () => {
    const [country, setCountry] = useState("");

  return (
    <>
    <Header />
      <div className='mb-40'>
      <img src={visaBg} alt="visa" className="w-full h-[50vh] object-cover" />


        <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Select your desired country</h2>
        <div className="flex justify-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Malaysia"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border p-2 rounded w-96"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Check</button>
        </div>
      </div>

      
      <div className="grid md:grid-cols-3 gap-6">
      
        <div className="md:col-span-2">
         
          <div className="mb-6 p-4">
            <h3 className="text-lg font-semibold">Summary</h3>
            <p><strong>Visa Type:</strong> Tourist Visa (E-Visa)</p>
            <p><strong>Processing Time:</strong> 5-7 business days</p>
            <p><strong>Processing Fee:</strong> BDT 4,500</p>
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
            <h3 className="text-lg font-semibold">List of Documents Needed</h3>
            <ul className="list-disc pl-6 text-sm">
              <li>Passport valid for at least 7 months.</li>
              <li>Two recent passport-size photographs.</li>
              <li>Bank statement of the last 6 months.</li>
              <li>Other required documents based on applicant type.</li>
            </ul>
          </div>
        </div>

        {/* Right Sidebar - Visa Assistance Form */}
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold">Request Visa Assistance</h3>
          <p className="text-sm text-gray-600 mb-4">Please share your contact information.</p>
          <form>
            <input type="text" placeholder="Enter your name" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded mb-2" />
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded mb-2" />
            <button className="bg-yellow-500 text-white w-full p-2 rounded mt-10">Submit</button>
          </form>
        </div>
      </div>
    </div>
      </div>
    </>
  )
}

export default VisaDetails