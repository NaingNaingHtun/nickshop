import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import { updateQuantity, removeProduct } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
const ShoppingCartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  let strTotal = product.total + "";
  //modifying the total
  //for example, assume the total is"30.999" and the we are goint to change the it into "30.9"
  if (strTotal.includes(".")) {
    const [firstPart, secondPart] = strTotal.split(".");
    strTotal = firstPart + "." + secondPart.charAt(0);
  }
  //decreasing the product quantity
  const decreaseQuantity = () => {
    setQuantity((prevQty) => (prevQty === 1 ? prevQty : prevQty - 1));
  };
  //increaseing the product quantity
  const increaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };
  //update the quantity
  useEffect(() => {
    dispatch(updateQuantity({ product, newQuantity: quantity }));
  }, [quantity]);
  return (
    <div className="flex items-center p-1 shadow-xm hover:shadow-xl border-b-[1px] border-gray-300">
      <div className=" flex-[2.3] md:flex-[3] flex gap-2 flex-col md:flex-row  items-center">
        <img
          src={product.image}
          className="w-[100px] h-[100px]  object-contain"
        />
        <div>
          <h4 className="font-semibold ">{product.title}</h4>
          <div>
            <b>Size:</b>
            <span className="ml-2">{product.size}</span>
          </div>
          <div className="flex gap-2 items-center">
            <b>Color:</b>
            <div
              style={{ backgroundColor: product.color }}
              className="w-5 h-5 rounded-full border-[1px] border-black"
            ></div>
          </div>
        </div>
      </div>
      <div className="flex-1 text-lg font-bold text-center">
        $ {product.price}
      </div>
      <div className="flex-1 md:flex-[2] font-bold">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div>
            <RemoveIcon onClick={decreaseQuantity} className="cursor-pointer" />
          </div>
          <div>
            <input
              value={quantity}
              min={1}
              step={1}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              className="w-10 text-center text-lg md:text-right outline-none"
            />
          </div>
          <div>
            <AddIcon onClick={increaseQuantity} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex-1 font-bold text-center text-lg">$ {strTotal}</div>
      <div className="flex-1 font-bold text-center">
        <RemoveCircleOutlineRoundedIcon
          className="text-red-500 cursor-pointer hover:scale-105 transition-transform"
          titleAccess="Remove From Shopping Cart"
          onClick={() => dispatch(removeProduct(product))}
        />
      </div>
    </div>
  );
};

export default ShoppingCartItem;
