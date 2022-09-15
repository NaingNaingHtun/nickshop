import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import DropDown from "react-dropdown";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PrimaryButton from "../components/PrimaryButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import api from "../api";
import "react-dropdown/style.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../slices/cartSlice";
import useMediaQuery from "use-mediaquery";
import { Skeleton, Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
const SingleProduct = () => {
  const [loading, setLoading] = useState(false);
  const mediumDevices = useMediaQuery("(min-width: 768px)");
  const ratio = 3;
  const imageRef = useRef();
  const lenRef = useRef();
  const [lenPosX, setLenPosX] = useState(0);
  const [lenPosY, setLenPosY] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [hoverOnImage, setHoverOnImage] = useState(false);
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const transition = useTransition(hoverOnImage, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  //================================EFFECTS================================
  //GET the product whenever id changes
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/products/find/${id}`);
        setProduct(res.data);
        setColor(res.data.colors[0]);
        setSize(res.data.sizes[0]);
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(true);
    getProduct();
    setLoading(false);
  }, [id]);

  //=============================FUNCTIONS=====================
  const addToCart = () => {
    const { _id, title, desc, image, price, category } = product;
    const total = quantity * price;
    const addingProduct = {
      _id,
      title,
      desc,
      image,
      size,
      color,
      quantity,
      price,
      total,
      category,
    };
    dispatch(addProduct(addingProduct));
    setOpenSnackBar(true); //show the "Addded to Cart" snackbar
  };

  //we are going track the user' mouse movements on the image and move the background image in the right div accordingly
  const handleMove = (e) => {
    if (mediumDevices) {
      const imageBound = imageRef.current.getBoundingClientRect();
      let x = e.pageX - imageBound.left; //cursor position x on the image
      let y = e.pageY - imageBound.top; //cursor position y on the image

      if (x > imageRef.current.offsetWidth - lenRef.current.offsetWidth / 2) {
        x = imageRef.current.offsetWidth - lenRef.current.offsetWidth / 2;
      }
      if (y > imageRef.current.offsetHeight - lenRef.current.offsetHeight / 2) {
        y = imageRef.current.offsetHeight - lenRef.current.offsetHeight / 2;
      }

      let positionX = x - lenRef.current.offsetWidth / 2; //len position x on the image
      let positionY = y - lenRef.current.offsetHeight / 2; //len position y on the image
      if (positionX < 0) {
        positionX = 0;
      }
      if (positionY < 0) {
        positionY = 0;
      }
      if (
        positionY >
        imageRef.current.offsetHeight - lenRef.current.offsetHeight / 3
      ) {
        positionY =
          imageRef.current.offsetHeight - lenRef.current.offsetHeight / 3;
      }
      if (
        positionX >
        imageRef.current.offsetWidth - lenRef.current.offsetWidth / 3
      ) {
        positionX =
          imageRef.current.offsetWidth - lenRef.current.offsetWidth / 3;
      }
      setLenPosX(positionX);
      setLenPosY(positionY);
    }
  };

  //image zoom is only available in medium sized devices
  const hover = () => {
    mediumDevices && setHoverOnImage(true);
  };
  const blur = () => {
    mediumDevices && setHoverOnImage(false);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="h-16" />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Added to Cart
        </Alert>
      </Snackbar>
      {loading ? (
        <div className="w-[100vw] h-[100vh] p-5 md:p-12 flex flex-col md:flex-row gap-5 justify-center items-center">
          <Skeleton
            variant="rectangular"
            className="flex-1"
            width="100%"
            height="100%"
          />
          <div className="w-full md:flex-1 flex items-start flex-col gap-5">
            <Skeleton width="200px" height="50px" variant="rectangular" />
            <Skeleton width="100%" height="100px" variant="rectangular" />
            <Skeleton width="100px" height="50px" variant="rectangular" />
            <Skeleton width="50px" height="50px" variant="rectangular" />
            <Skeleton width="150px" height="50px" variant="rectangular" />
            <Skeleton width="100%" height="50px" variant="rectangular" />
          </div>
        </div>
      ) : (
        product && (
          <div className="w-[100vw] p-5 md:p-12 flex flex-col md:flex-row gap-5 justify-center items-center">
            <div className="w-full  md:w-[400px] md:h-[80vh] flex justify-center items-center">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  ref={imageRef}
                  onMouseEnter={hover}
                  onMouseLeave={blur}
                  onMouseMove={handleMove}
                  className={`w-[90vw] md:w-[400px] h-[400px] object-contain z-10 `}
                />
                <div
                  ref={lenRef}
                  className="hidden md:block h-[150px] w-[150px] absolute z-20 cursor-pointer bg-blue-300 bg-opacity-40"
                  style={{
                    top: lenPosY,
                    left: lenPosX,
                    display: hoverOnImage ? "block" : "none",
                  }}
                  onMouseMove={handleMove}
                  onMouseEnter={hover}
                  onMouseLeave={blur}
                ></div>
                <div
                  className={`absolute w-auto hidden md:${
                    hoverOnImage ? "hidden" : "block"
                  } p-1 bg-black text-white text-center bottom-0 left-0`}
                >
                  hover to zoom
                </div>
              </div>
            </div>
            <div className={`w-full md:w-[400px] lg:w-[600px]`}>
              {transition(
                (styles, show) =>
                  !show && (
                    <animated.div
                      className={`flex flex-col gap-5 md:hidden`}
                      style={{
                        ...styles,
                        display: hoverOnImage ? "none" : "flex",
                      }}
                    >
                      <h1 className="text-2xl font-bold tracking-wide uppercase">
                        {product.title}
                      </h1>
                      <p
                        className="text-lg font-light"
                        style={{ fontFamily: "Nunito, sans-serif" }}
                      >
                        {product.desc}
                      </p>
                      <span className="text-2xl font-semibold">
                        ${product.price}
                      </span>
                      <div className="flex gap-2 items-center">
                        <span className="text-xl">Color:</span>
                        <div className="flex gap-2 items-center">
                          {product.colors.map((clr) => (
                            <div
                              key={clr}
                              title={clr}
                              className={`rounded-full cursor-pointer border-[1px] border-black`}
                              onClick={() => setColor(clr)}
                              style={{
                                backgroundColor: clr,
                                border: color === clr ? "2px solid teal" : "",
                                width: `${color === clr ? "30px" : "20px"}`,
                                height: `${color === clr ? "30px" : "20px"}`,
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-xl">Size:</span>
                        <DropDown
                          options={product.sizes}
                          value={product.sizes[0]}
                          onChange={(option) => setSize(option.value)}
                          className="z-0"
                        />
                      </div>
                      <div className="w-full md:w-[50%] flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-lg">Quantity:</span>
                          <div className="flex items-center">
                            <RemoveIcon
                              className="cursor-pointer "
                              fontSize="medium"
                              titleAccess="Decrease quantity"
                              onClick={() =>
                                setQuantity((prevQuantity) => {
                                  if (prevQuantity === 1) {
                                    return prevQuantity;
                                  } else {
                                    return prevQuantity - 1;
                                  }
                                })
                              }
                            />
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              min={0}
                              step={1}
                              className="w-12 p-1 font-bold text-lg text-center md:text-right"
                            />
                            <AddIcon
                              className="cursor-pointer"
                              fontSize="medium"
                              titleAccess="Increase quantity"
                              onClick={() =>
                                setQuantity((prevQuantity) => prevQuantity + 1)
                              }
                            />
                          </div>
                        </div>
                        <div title="Update Quantity"></div>
                      </div>
                      <PrimaryButton onClick={addToCart}>
                        Add To Cart
                        <AddShoppingCartIcon className="ml-1" />
                      </PrimaryButton>
                    </animated.div>
                  )
              )}
              {transition(
                (styles, show) =>
                  show && (
                    <animated.div
                      className={`hidden md:block border-black border-[1px] w-full md:w-[300px] lg:w-[600px] md:h-[400px] bg-no-repeat`}
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundPosition: `-${lenPosX * ratio}px -${
                          lenPosY * ratio
                        }px`,
                        backgroundSize: `${400 * ratio}px ${400 * ratio}px`,
                        ...styles,
                        display: hoverOnImage ? "block" : "none",
                      }}
                    ></animated.div>
                  )
              )}
            </div>
          </div>
        )
      )}
      <NewsLetter />
      <Footer />
    </React.Fragment>
  );
};

export default SingleProduct;
