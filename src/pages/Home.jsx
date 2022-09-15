import React, { useState, useEffect } from "react";
import BestSellings from "../components/BestSellings";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import PrimaryButton from "../components/PrimaryButton";
import Products from "../components/Products";
import api from "../api";
const Home = () => {
  const [bestSellings, setBestSellings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const localeTime = new Date().toLocaleTimeString(); //"00:00:00 PM"
  //=============FUNCTIONS============
  const getBestSellings = async () => {
    setLoading(true);
    await api
      .get("/orders/best-sellings-products")
      .then((res) => {
        setBestSellings(res.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  //==============SIDE EFFECTS==========
  useEffect(() => {
    getBestSellings();
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <div className="h-8" />
      <div className="relative flex w-[100vw] h-[90vh] md:h-[100vh]">
        <div className="absolute flex flex-col gap-5 justify-center items-start p-5 md:p-[50px] top-0 left-0 w-[100%] h-[100%] ">
          <h1 className="text-4xl italic">
            Hi,{" "}
            {localeTime.split(" ")[1] === "AM"
              ? "Good Morning"
              : "Good Evening"}
          </h1>
          <h1 className="text-6xl md:text-7xl tracking-wide">
            Welcome to{" "}
            <span className="logo-font tracking-normal font-bold">
              NICK SHOP
            </span>
          </h1>
          <p className="text-xl">
            Don't have time to go to shop. Don't worry. We got you. Sit at home
            and search what you love and order it. We will be right there in a
            minute.
          </p>
          <PrimaryButton onClick={() => (window.location.href = "/products")}>
            Shop Now
          </PrimaryButton>
        </div>
      </div>
      <BestSellings
        bestSellings={bestSellings}
        loading={loading}
        error={error}
      />
      <div className="text-center p-2 mb-4">
        <span className="text-4xl font-bold header-font border-[2px] border-black border-r-0 border-l-0">
          Latest Products
        </span>
      </div>
      <Products />
      <NewsLetter />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
