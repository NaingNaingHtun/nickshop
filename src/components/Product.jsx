import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated, useTransition } from "react-spring";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../slices/wishListSlice";
import { Tooltip } from "@mui/material";
const Product = ({ product }) => {
  const [hover, setHover] = useState(false);
  const wishList = useSelector((state) => state.wishList.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="relative p-2 flex flex-col justify-between bg-white w-full h-[250px] md:h-[300px] cursor-pointer border-[1px] shadow-lg hover:shadow-xl  rounded-xl"
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className="w-full h-[150px] md:h-[200px] grid place-content-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[150px] md:h-[200px] object-contain hover:scale-110 transition-transform"
          loading="lazy"
        />
      </div>

      <div>
        <h1 className="w-[100%] text-lg font-bold truncate">{product.title}</h1>
        <div className="flex justify-between">
          <span className="underline">$ {product.price}</span>
          {wishList.includes(product) ? (
            <Tooltip title="Added to Favorites">
              <FavoriteIcon
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeItem(product));
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Add to Favorites">
              <FavoriteBorderIcon
                className="hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addItem(product));
                }}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <div
        style={{ display: hover ? "block" : "none" }}
        className="absolute top-0 left-0 bg-blue-500 p-1 text-white text-center"
      >
        Click To View
      </div>
    </div>
  );
};

export default Product;
