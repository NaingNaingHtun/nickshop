import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";

const OrderConfimration = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="h-16"></div>
      <div className="flex flex-col gap-3 justify-center items-center w-full h-[100vh]">
        <div className="text-lg">Your order is confirmed.</div>
        <div className="text-blue-500 text-4xl">
          Thanks For Shopping With Us
        </div>
        <Link to="/products" className="underline">
          Shop More
        </Link>
      </div>
      <NewsLetter />
      <Footer />
    </React.Fragment>
  );
};

export default OrderConfimration;
