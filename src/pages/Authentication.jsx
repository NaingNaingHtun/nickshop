import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Register from "../components/Register";
import { useLocation } from "react-router-dom";
import SignIn from "../components/SignIn";
import { useSelector } from "react-redux";
const Authentication = () => {
  const user = useSelector((state) => state.user.currentUser);
  const authenticatedUser = useSelector(
    (state) => state.user.authenticatedUser
  );
  const location = useLocation();
  let tab = null;
  //update the tab based on the current url,
  if (location.pathname === "/register") {
    tab = 0;
  }
  if (location.pathname === "/login") {
    tab = 1;
  }
  const [tabIndex, setTabIndex] = useState(tab);
  //redirecting the user to the products if they are already authenticated.
  //They don't need to go to the login page
  useEffect(() => {
    if (user && authenticatedUser) {
      window.location.href = "/products";
    }
  }, [user, authenticatedUser]);
  return (
    <div
      className="w-[100vw] min-h-[100vh] grid place-content-center p-[50px] bg-cover bg-no-repeat bg-black"
      style={{
        background: "rgb(255,255,255)",
        background:
          "linear-gradient(320deg, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%)",
      }}
    >
      <div className="w-[95vw] md:w-[40vw]">
        <div className="text-center p-5 text-4xl text-white logo-font">
          Nick Shop
        </div>
        <div className="rounded-lg shadow-lg p-5 bg-white">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => {
              setTabIndex(index);
            }}
            className="w-full"
          >
            <TabList className="flex border-b-[1px]">
              <Tab
                className="grow border-none outline-none text-center rounded-none cursor-pointer py-1  header-font"
                style={{
                  borderBottom: tabIndex === 0 ? "2px solid black" : "",
                }}
              >
                REGISTER
              </Tab>
              <Tab
                className=" grow border-none outline-none text-center rounded-none cursor-pointer py-1  header-font"
                style={{
                  borderBottom: tabIndex === 1 ? "2px solid black" : "",
                }}
              >
                SIGN IN
              </Tab>
            </TabList>
            <TabPanel>
              <Register />
            </TabPanel>
            <TabPanel>
              <SignIn />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
