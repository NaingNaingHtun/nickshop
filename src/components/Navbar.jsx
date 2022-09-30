import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import api from "../api";
import { logout } from "../slices/userSlice";
import { clearFilter } from "../slices/filterSlice";
import { clearCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { ControlledMenu, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useRef } from "react";
import ProfileModal from "./ProfileModal";
import { emptyList } from "../slices/wishListSlice";

const SearchModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getTitles = async () => {
    const res = await api.get(
      `/products/search/titles/?title=${searchContent}`
    );
    // console.log(res.data);
    setSearchResults(res.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      getTitles();
    }, 600);
    return () => clearTimeout(timeout);
  }, [searchContent]);

  const handleSubmit = (e) => {
    onClose();
    e.preventDefault();
    navigate(`/products/?title=${searchContent}`);
    setSearchContent("");
    setSearchResults([]);
  };
  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-[95%] md:w-[40%]  rounded p-1 bg-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              className="outline-none p-2 flex-1"
              value={searchContent}
              autoFocus
              type="text"
              placeholder="Type product name"
              onChange={(e) =>
                setSearchContent(e.target.value.toLocaleLowerCase())
              }
            />
            <button className="" type="submit">
              <SearchIcon className="cursor-pointer" />
            </button>
          </div>
          <div className="max-h-[90vh] overflow-scroll">
            {loading ? (
              <div className="p-2 text-center">Loading...</div>
            ) : searchResults.length === 0 ? (
              <div className="p-2 text-center">No Product</div>
            ) : (
              searchResults.map((result, index) => (
                <div
                  className="p-2 cursor-pointer truncate w-full"
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: result.title
                      .toLowerCase()
                      .replaceAll(searchContent, `<b>${searchContent}</b>`),
                  }}
                  onClick={() => {
                    navigate(`/products/?title=${result.title}`);
                    onClose();
                    setSearchContent("");
                    setSearchResults([]);
                  }}
                ></div>
              ))
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const authenticatedUser = useSelector(
    (state) => state.user.authenticatedUser
  );
  const totalItems = useSelector((state) => state.cart.products.length);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const categoriesRef = useRef();
  const menuRef = useRef();
  const accountRef = useRef();
  const [openCategories, setOpenCategories] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  //open search modal
  const open = () => {
    setOpenModal(true);
  };
  //close search modal
  const close = () => {
    setOpenModal(false);
  };
  //when the user is about to logout, we must clear the user from the session storage
  //and clear their filters, cart and wishlist from the session storage ,and then redirect them back to the home page
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFilter());
    dispatch(clearCart());
    dispatch(emptyList());
    navigate("/");
  };
  //open user info profile modal
  const openUserModal = () => {
    setOpenUserInfo(true);
  };
  //close user info profile modal
  const closeUserModal = () => {
    setOpenUserInfo(false);
  };
  //--------------------------------------SIDE EFFECTS--------------------------------
  return (
    <React.Fragment>
      <div className="flex items-center z-[999] h-16 shadow-lg fixed top-0 left-0 w-full bg-white">
        <div className="flex justify-between items-center gap-2 flex-1">
          <div className="flex gap-2 items-center">
            <HomeRoundedIcon
              className="text-gray-500 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h1
              className="hidden md:block flex-1 text-center logo-font text-3xl font-extrabold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Nick Shop
            </h1>
            <div
              onClick={open}
              className="flex items-center p-2 border-[1px] shadow-md cursor-pointer"
            >
              <input
                className="outline-none cursor-pointer"
                type="text"
                placeholder="Type product name"
                readOnly={true}
              />
              <SearchIcon />
            </div>
          </div>

          <div className="hidden lg:flex gap-10">
            <Link to="/" className="text-lg header-font">
              Home
            </Link>
            <Link
              ref={categoriesRef}
              onMouseEnter={() => setOpenCategories(true)}
              to="/products"
              className="text-lg header-font"
            >
              Products
            </Link>
            <Link className="text-lg header-font" to="/contact-us">
              Contact Us
            </Link>
            <Link className="text-lg header-font" to="/about-us">
              About Us
            </Link>
            <ControlledMenu
              anchorRef={categoriesRef}
              state={openCategories ? "open" : "closed"}
              onMouseLeave={() => setOpenCategories(false)}
              onClose={() => setOpenCategories(false)}
            >
              <MenuItem onClick={() => navigate("/products/?title=hat")}>
                Shoe
              </MenuItem>
              <MenuItem onClick={() => navigate("/products/?title=glasses")}>
                Glasses
              </MenuItem>
              <MenuItem onClick={() => navigate("/products/?title=coat")}>
                Coat
              </MenuItem>
              <MenuItem onClick={() => navigate("/products/?title=shirt")}>
                Shirt
              </MenuItem>
              <MenuItem onClick={() => navigate("/products/?title=pant")}>
                Pant
              </MenuItem>
              <MenuItem onClick={() => navigate("/products/?title=shoe")}>
                Shoe
              </MenuItem>
            </ControlledMenu>
          </div>

          <div className="flex justify-end items-center ">
            <div className="flex justify-end gap-2 md:gap-5 items-center">
              {!authenticatedUser && !user && (
                <Link to="/login" className="hidden lg:block">
                  Sign In / Sign Up
                </Link>
              )}

              <Badge badgeContent={totalItems} color="primary">
                <Link to="/cart">
                  <ShoppingCartOutlinedIcon />
                </Link>
              </Badge>
              <div>
                {authenticatedUser && user && (
                  <React.Fragment>
                    <AccountCircleRoundedIcon
                      fontSize="large"
                      onClick={() => setOpenAccount(true)}
                      className="cursor-pointer text-blue-500"
                      ref={accountRef}
                    />

                    <ControlledMenu
                      anchorRef={accountRef}
                      align="start"
                      state={openAccount ? "open" : "closed"}
                      onClose={() => setOpenAccount(false)}
                    >
                      <div className="flex flex-col items-center p-5">
                        <Avatar />
                        <div className="text-gray-500">Welcome</div>
                        <h1 className="text-lg font-semibold">
                          {user.username}
                        </h1>
                        <div>
                          <button
                            className="border-[1px] border-black p-1 rounded-md mt-1"
                            onClick={openUserModal}
                          >
                            Update Profile
                          </button>
                          <button
                            className="border-[1px] border-black p-1 rounded-md m-1"
                            onClick={handleLogout}
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </ControlledMenu>
                  </React.Fragment>
                )}
              </div>
              <div className="block lg:hidden">
                <MenuRoundedIcon
                  ref={menuRef}
                  onClick={() => setOpenMenu(true)}
                  fontSize="large"
                />
                <ControlledMenu
                  anchorRef={menuRef}
                  state={openMenu ? "open" : "closed"}
                  onClose={() => setOpenMenu(false)}
                >
                  <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                  <SubMenu label="Products">
                    <MenuItem onClick={() => navigate("/products/?title=hat")}>
                      Shoe
                    </MenuItem>
                    <MenuItem
                      onClick={() => navigate("/products/?title=glasses")}
                    >
                      Glasses
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/products/?title=coat")}>
                      Coat
                    </MenuItem>
                    <MenuItem
                      onClick={() => navigate("/products/?title=shirt")}
                    >
                      Shirt
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/products/?title=pant")}>
                      Pant
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/products/?title=shoe")}>
                      Shoe
                    </MenuItem>
                  </SubMenu>
                  <MenuItem onClick={() => navigate("/contact-us")}>
                    Contact Us
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/about-us")}>
                    About Us
                  </MenuItem>
                  {!authenticatedUser && !user && (
                    <MenuItem onClick={() => navigate("/login")}>
                      Sign In/Sign Up
                    </MenuItem>
                  )}
                </ControlledMenu>
              </div>
            </div>
          </div>
        </div>
        <SearchModal open={openModal} onClose={close} />
        <ProfileModal open={openUserInfo} handleClose={closeUserModal} />
      </div>
    </React.Fragment>
  );
};

export default Navbar;
