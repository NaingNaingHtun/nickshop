import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { emptyList } from "../slices/wishListSlice";
import { Link } from "react-router-dom";
const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList.list);
  console.log(wishList);
  return (
    <React.Fragment>
      <Navbar />
      <div className="h-16" />
      <div>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-xl">
            Your Wishing List <b>(0)</b> items
          </h1>
          <button
            disabled={wishList.length === 0}
            className="py-1 px-2 border-[1px] border-red-500 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray"
            onClick={() => dispatch(emptyList())}
          >
            Clear All
          </button>
        </div>
        {wishList.length === 0 ? (
          <div className="w-[100vw] h-[50vh] grid place-content-center">
            <h1 className="text-xl font-bold">No Item In Your Wishing List</h1>
            <Link to="/products" className="underline text-center">
              Back To Shop
            </Link>
          </div>
        ) : (
          <div className="w-[98vw] p-2 gap-2 grid grid-cols-1 md:grid-cols-4">
            {wishList.map((item, index) => (
              <Product product={item} key={index} />
            ))}
          </div>
        )}
      </div>
      <NewsLetter />
      <Footer />
    </React.Fragment>
  );
};

export default WishList;
