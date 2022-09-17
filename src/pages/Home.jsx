import React, { useState, useEffect } from "react";
import BestSellings from "../components/BestSellings";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import PrimaryButton from "../components/PrimaryButton";
import Products from "../components/Products";
import api from "../api";
import { useTrail, animated } from "react-spring";
const Trail = ({ open, children }) => {
  const styles = [
    "text-4xl underline",
    "text-6xl md:text-7xl tracking-wide header-font",
    "text-xl text-gray-500",
  ];
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    from: { opacity: 0, height: 0, x: 100 },
    config: { mass: 5, tension: 2000, friction: 200, duration: 500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 100,
  });

  return (
    <React.Fragment>
      {trail.map(({ opacity, style }, index) => (
        <animated.h1
          style={{ opacity, ...style }}
          className={styles[index]}
          key={index}
        >
          {items[index]}
        </animated.h1>
      ))}
    </React.Fragment>
  );
};
const Home = () => {
  const [bestSellings, setBestSellings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const localeTime = new Date().toLocaleTimeString(); //"00:00:00 PM"
  const [open, setOpen] = useState(true);
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
      <div
        className="relative flex w-[100vw] h-[90vh] md:h-[100vh]"
        style={{
          background: "rgb(255,255,255)",
          background:
            "linear-gradient(32deg, rgba(255,255,255,1) 82%, rgba(0,0,0,1) 82%)",
        }}
      >
        <div className="absolute flex flex-col gap-5 justify-center items-start p-5 md:p-[50px] top-0 left-0 w-[100%] h-[100%] ">
          <Trail open={open}>
            <span>
              Hi,{" "}
              {localeTime.split(" ")[1] === "AM"
                ? "Good Morning"
                : "Good Evening"}
            </span>
            <span>
              Welcome to{" "}
              <span className="logo-font tracking-normal ">NICK SHOP</span>
            </span>
            <span>
              Don't have time to go to shop. Don't worry. We got you. Sit at
              home and order it. We will be right there in a minute.
            </span>
          </Trail>
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
