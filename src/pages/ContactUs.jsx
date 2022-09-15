import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
const ContactUs = () => {
  const center = [21.949026853455415, 96.07767846998306];
  const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution = `&copy; <a href="https://www.maptiler.org/">MapTiler</a> contributors`;
  return (
    <React.Fragment>
      <Navbar />
      <div className="h-16" />
      <div>
        <div className="mt-[30px] ">
          <div className="flex justify-center p-5">
            <span className="text-4xl font-bold border-b-4 border-blue-500 header-font">
              Contact Us
            </span>
          </div>
          <div className="flex w-full flex-col md:flex-row md:justify-center md:h-[90vh]">
            <div className="w-full md:w-[45%] flex items-center ">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 bg-black">
                <div className="h-[200px] md:h-[280px] flex flex-col gap-5 justify-center items-center">
                  <div className="grid place-content-center w-[70px] h-[70px] border-2 border-gray-500 rounded-full">
                    <RoomIcon className="text-white" fontSize="large" />
                  </div>
                  <h1 className="uppercase text-lg text-white header-font">
                    Address
                  </h1>
                  <div className="text-white text-lg">
                    Chan Mya Tharsi, Mandalay
                  </div>
                </div>
                <div className="h-[200px] md:h-[280px] flex flex-col gap-5 justify-center items-center">
                  <div className="grid place-content-center w-[70px] h-[70px] border-2 border-gray-500 rounded-full">
                    <EmailIcon className="text-white" fontSize="large" />
                  </div>
                  <h1 className="uppercase text-lg text-white header-font">
                    Email
                  </h1>
                  <div className="text-white text-lg">
                    nickhassan984@gmail.com
                  </div>
                </div>
                <div className="h-[200px] md:h-[280px] flex flex-col gap-5 justify-center items-center">
                  <div className="grid place-content-center w-[70px] h-[70px] border-2 border-gray-500 rounded-full">
                    <PhoneIcon className="text-white" fontSize="large" />
                  </div>
                  <h1 className="uppercase text-lg text-white header-font">
                    Phone
                  </h1>
                  <div className="text-white text-lg">959797347550</div>
                </div>
                <div className="h-[200px] md:h-[280px] flex flex-col gap-5 justify-center items-center">
                  <h1 className="text-lg text-white header-font">
                    Contact Us On Social
                  </h1>
                  <div className="flex gap-2 text-white">
                    <FacebookIcon fontSize="large" className="cursor-pointer" />
                    <InstagramIcon
                      fontSize="large"
                      className="cursor-pointer"
                    />
                    <TwitterIcon fontSize="large" className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[45%] flex items-center z-0">
              <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                className="flex-1 w-full h-[300px] md:w-[560px] md:h-[560px]"
              >
                <TileLayer url={mapUrl} attribution={attribution} />
                <Marker position={center}></Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </React.Fragment>
  );
};

export default ContactUs;
