import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";

const BestSellingItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex-0 md:flex-1 w-[100vw] h-[250px] md:h-[400px] hover:scale-105 transition-all  hover:z-[999]">
      <img
        src={item.image}
        className="w-full h-full object-contain"
        loading="lazy"
      />
      <div className="absolute w-full top-0 left-0 h-full flex flex-col gap-3 items-center justify-center z-10 bg-black bg-opacity-10">
        <SecondaryButton onClick={() => navigate(`/product/${item.id}`)}>
          shop now
        </SecondaryButton>
      </div>
      <div className="absolute top-0 left-0 text-white bg-blue-500 p-1">
        Best Seller
      </div>
    </div>
  );
};

export default BestSellingItem;
