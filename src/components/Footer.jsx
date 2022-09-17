import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RoomIcon from "@mui/icons-material/Room";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:h-[40vh] bg-white py-5 md:py-5">
        <div className="flex-1 p-5 flex flex-col gap-6">
          <h1 className="text-4xl tracking-widest font-bold logo-font">
            Nick Shop
          </h1>
          <p>
            Our Mision is to provide the best valued products to our customers
            across Globe. We provide basic clothes from hat to shoe.
          </p>
          <div className="flex gap-2">
            <div className="bg-[#4267B2] p-2 rounded-full text-white cursor-pointer hover:scale-110 transition-transform">
              <FacebookRoundedIcon />
            </div>
            <div
              className="text-white cursor-pointer hover:scale-110 transition-transform p-2 rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #405DE6, #5B51D8, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)",
              }}
            >
              <InstagramIcon />
            </div>
            <div className="text-white cursor-pointer hover:scale-110 transition-transform bg-[#1DA1F2] p-2 rounded-full">
              <TwitterIcon />
            </div>
            <div className="text-white cursor-pointer hover:scale-110 transition-transform bg-[#E60023] p-2 rounded-full">
              <PinterestIcon />
            </div>
          </div>
        </div>
        <div className="p-5 flex-1">
          <h1 className="text-xl font-semibold header-font">Userful Links</h1>
          <ul className="m-0 p-0 list-none flex flex-wrap mt-6">
            <Link to="/" className="w-[50%] mb-3">
              Home
            </Link>
            <Link to="/cart" className="w-[50%] mb-3">
              Cart
            </Link>
            <Link to="/products/?title=men" className="w-[50%] mb-3">
              Men Fashion
            </Link>
            <Link to="/products/?title=women" className="w-[50%] mb-3">
              Women Fashion
            </Link>
            <Link to="/products" className="w-[50%] mb-3">
              Products
            </Link>
            <Link to="/wishlist" className="w-[50%] mb-3">
              Wishlist
            </Link>
            <Link to="/terms" className="w-[50%] mb-3">
              Terms
            </Link>
          </ul>
        </div>
        <div className="p-5 flex-1">
          <h1 className="text-xl font-semibold header-font">Contact</h1>
          <div className="flex items-center gap-2 mt-6">
            <RoomIcon fontSize="medium" /> 41, 88x89 Chan Mya Tharsi Mandalay
          </div>
          <div className="flex items-center gap-2 mt-3">
            <MailIcon fontSize="medium" />
            naingnainghtun984@gmail.com
          </div>
        </div>
      </div>
      <div className="p-5">
        © Nick Shop created By Nick Hassan/Naing Naing Htun. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
