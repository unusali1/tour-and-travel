import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
    { title: "🏨 Hotel", to: "/?search=Hotel" },
    { title: "🏨 House Rent", to: "/?search=House%20Rent" },
    { title: "🏨 Apartment", to: "/?search=Appartment" },
    { title: "🛂 Visa", to: "/?search=Visa" },
  ];
  
const Navigation = ({ activeItem }) => {
  return (
    <div className="flex flex-col md:flex-row">
      {navItems.map((item, index) => (
        <NavLink 
          key={item.title} 
          to={item.to} // ✅ Use "to" instead of "href"
          className={({ isActive }) => 
            `block md:inline-block md:px-4 xl:px-8 py-5  md:py-0 text-[16px] font-[600] font-Monserrat`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
