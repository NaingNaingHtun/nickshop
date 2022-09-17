import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { ReactComponent as WhoWeAreSvg } from "./who-we-are.svg";
import { ReactComponent as WhatWeOfferSvg } from "./what-we-offer.svg";
const AboutUs = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="h-16" />
      <div className="mt-[30px] text-center">
        <span className="border-b-4 border-black p-1 text-4xl header-font">
          About Us
        </span>
      </div>
      <div className="mt-[30px] w-[100vw] grid place-content-center">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2">
          <div className="w-full md:w-[500px] h-[300px] md:h-[400px] flex justify-center items-center">
            <div
              className="w-[300px] h-[300px] flex justify-center items-center flex-col gap-2 bg-black text-white"
              style={{ boxShadow: "-12px 12px 0px -2px gray" }}
            >
              <h1 className="text-4xl header-font">Who We Are?</h1>
              <WhoWeAreSvg width="150" height="150" />
            </div>
          </div>
          <div className="w-full md:w-[500px] h-[300px] md:h-[400px] flex justify-center items-center p-2">
            <p className="text-2xl">
              <span className="text-black">Nick Shop</span> is the online mall
              started with a vision to take our consumers to the next level of
              shopping. It is the Ecommerce website which was started in 2022 by
              A Group of People who love selling things with love.
            </p>
          </div>

          <div className="w-full md:w-[500px] h-[300px] md:h-[400px] flex justify-center items-center">
            <div
              className="w-[300px] h-[300px] flex justify-center items-center flex-col gap-2 bg-black text-white"
              style={{ boxShadow: "-12px 12px 0px -2px gray" }}
            >
              <h1 className="text-4xl header-font">What We Offer</h1>
              <WhatWeOfferSvg width="150" height="150" />
            </div>
          </div>
          <div className="w-full md:w-[500px] h-[300px] md:h-[400px] flex justify-center items-center p-2">
            <p className="text-2xl">
              Our Mision is to provide the best valued products to our customers
              across Globe. We provide basic clothes from hat to shoe.
            </p>
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </React.Fragment>
  );
};

export default AboutUs;
