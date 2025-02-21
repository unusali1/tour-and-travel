import React from "react";
import logo from "../../assets/logo.png";
import payment from "../../assets/payment.png";
import { Icon } from "@iconify/react";
const Footter = () => {
  return (
    <>
      <footer
        className="bg-[#00026E] text-white py-10"
        //   style={{
        //     backgroundImage: `url(${footerImg})`,
        //     backgroundRepeat: "no-repeat",
        //     backgroundSize: "cover",
        //     backgroundColor: "black",
        //   }}
      >
        <div className="container mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <img src={logo} alt="logo" className="h-20 mb-2" />
              <p className="text-sm text-gray-400">
              Stay, rent, or ride—your journey starts here! Book top hotels, find the perfect apartment, and unlock exclusive perks. Limited-time offer for new customers!
              </p>
              
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">USEFUL LINKS</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-primary">
                   Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                   Terms & Condition
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                   Emi Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">PAYMENT METHODS</h3>
              <img src={payment} alt="logo" className="h-36 mb-2" />
            </div>

            <div>
              <h3 className="font-bold text-lg">OUR OFFICE</h3>
              <ul className=" text-sm text-gray-400 mt-2">
                <li>
                  128 Horton Grange Road, Bradford, West Yorkshire, BD7 2DW
                </li>
                
              </ul>

              <h3 className="font-bold text-lg mt-2">FOLLOW US</h3>

              <div className="flex space-x-8 mt-4">
                <a href="#" className="text-gray-400 hover:text-primary bg-white p-2 rounded-full">
                  <Icon
                    icon="iconoir:facebook"
                    className="font-bold text-2xl text-blue-700 "
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary bg-white p-2 rounded-full">
                <Icon
                    icon="ri:youtube-line"
                    className="font-bold text-2xl text-blue-700"
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary bg-white p-2 rounded-full">
                <Icon
                    icon="iconoir:instagram"
                    className="font-bold text-2xl  text-blue-700"
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary bg-white p-2 rounded-full">
                <Icon
                    icon="hugeicons:twitter"
                    className="font-bold text-2xl  text-blue-700"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col-reverse gap-4 md:flex-row justify-center items-center ">
            <p className="text-sm text-gray-400">
              Copyright &copy; 2025 <span className="">Gozayaan</span>.
              All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footter;
