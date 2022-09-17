import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import NewsLetter from "../components/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartItem from "../components/ShoppingCartItem";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { clearCart } from "../slices/cartSlice";
const formatMoney = (amount) => {
  let strTotal = amount + "";
  if (strTotal.includes(".")) {
    const [firstPart, secondPart] = strTotal.split(".");
    strTotal = firstPart + "." + secondPart.charAt(0);
  }
  return strTotal;
};
const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const wishList = useSelector((state) => state.wishList.list);
  let total = 0;
  cart.products.forEach((product) => {
    total += product.price * product.quantity;
  });

  //============================FUNCTIONS============================
  const checkout = async () => {
    if (!user) {
      //if the user is not logged in then we need them creat a new account or login, so redirect them to the login page
      navigate("/login");
    }

    let orderTotal = 0; //initial order total
    //calculating the order total
    cart.products.forEach((p) => (orderTotal += p.total));
    //making a new order
    const newOrder = {
      userId: user._id,
      products: cart.products,
      total: formatMoney(orderTotal),
      address: "no address",
      status: "Pending",
    };
    //send to the server
    api
      .post("/orders", newOrder, {
        headers: {
          authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        //after successfully making a new order, clear user shopping cart and redirect them to the order confirmation page
        navigate("/order-confirmation");
        dispatch(clearCart());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />
      <div className="h-16" />
      {cart.products.length === 0 ? (
        <div className="w-full h-[50vh]">
          <div className="flex justify-between items-center">
            <h1 className="text-lg">
              Your Shooping Cart <b>(0)</b> items
            </h1>
            <Link to="/wishlist" className="text-lg underline">
              Your Wishing Products <b>{wishList.length}</b>
            </Link>
            <h1 className="mr-5 text-xl">
              <b>Price:</b> $ 0
            </h1>
          </div>
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold">Your Shopping Cart is Empty</h1>
            <Link to="/products" className="underline">
              Start Adding Some
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-2xl p-2">
            Your Shopping Bag (
            <span className="font-bold">{cart.products.length}</span>) items
          </h1>
          <div className="flex">
            <div className="w-full md:flex-[2.5]">
              <div className="w-full flex justify-between p-1">
                <Link to="/products" className="underline">
                  Continue Shopping
                </Link>
                <span>
                  <b>Price:</b>
                  <span className="ml-2">$ {formatMoney(total)}</span>
                </span>
              </div>
              <div className="flex items-center p-1 border-b-[1px] text-gray-500 border-black">
                <div className="flex-[3] text-center">Product</div>
                <div className="flex-1 text-center">Price</div>
                <div className="flex-[2] text-center">Quantity</div>
                <div className="flex-1 text-center">Total</div>
                <div className="flex-1 text-center"></div>
              </div>
            </div>
            <div className="hidden md:block md:flex-1"></div>
          </div>

          <div className="w-full flex h-[90vh] flex-col md:flex-row">
            <div className="flex-[2.5] overflow-auto flex flex-col gap-2 py-2">
              {cart.products.map((item, index) => (
                <ShoppingCartItem product={item} key={index} />
              ))}
            </div>
            <div
              className="flex-[1] flex justify-center"
              style={{ fontFamily: "Roboto Slab, serif" }}
            >
              <div className="w-[100%] bg-gray-200 flex flex-col gap-3 p-1">
                <h1 className="border-b-[1px] border-black p-1 text-2xl">
                  Order Summary
                </h1>
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span>$ 0</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Discount:</span>
                  <span>$ 0</span>
                </div>
                <div className="border-b-[1px] border-black flex justify-between">
                  <span>Estimated Discount:</span>
                  <span>$ 0</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>$ {formatMoney(total)}</span>
                </div>
                <PrimaryButton onClick={checkout}>Checkout</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <NewsLetter />
      <Footer />
    </>
  );
};

export default ShoppingCart;
