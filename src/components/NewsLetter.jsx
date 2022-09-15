import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import emailjs from "@emailjs/browser";
import api from "../api";
import { Alert, Snackbar } from "@mui/material";
const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const templateId = "template_39ge3bj";
  const serviceId = "service_qowba3r";
  const publicKey = "4sNN_LZOEwtNqNezC";
  const [success, setSuccess] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const templateParams = {
    reply_to: email,
  };
  //===============FUNCTIONS============
  const subscribe = async (e) => {
    e.preventDefault();
    //first add the user email to the subscription, then send a response email to the user
    if (email) {
      setSubscribing(true);
      await api
        .post("/emails", { email })
        .then(
          await emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
              setOpenSnackBar(true);
              setSuccess(true);
              setSubscribing(false);
              setEmail("");
            })
            .catch((error) => {
              setOpenSnackBar(true);
              setSuccess(false);
              console.log(error);
              setSubscribing(false);
            })
        )
        .catch((error) => {
          setOpenSnackBar(true);
          setSuccess(false);
          console.log(error);
          setSubscribing(false);
        });
    }
  };
  return (
    <div className="p-3 h-[60vh] w-full flex flex-col gap-8 md:gap-6 justify-center items-center bg-black text-white">
      <h1 className="text-4xl tracking-widest text-center header-font">
        NewsLetter
      </h1>
      <p className="text-2xl tracking-wide text-center">
        Get timely updates from your favourite products.
      </p>
      <form onSubmit={subscribe} className="flex w-full md:w-[50%]">
        <input
          type="email"
          placeholder="Your email"
          required={true}
          value={email}
          className="h-full p-2 border-none outline-none grow text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PrimaryButton onClick={subscribe}>
          {subscribing ? "Subscribing..." : "Susbscribe"}
        </PrimaryButton>
      </form>
      <Snackbar
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        autoHideDuration={2000}
      >
        {success ? (
          <Alert variant="filled" color="success">
            Successfully subscribed
          </Alert>
        ) : (
          <Alert variant="filled" color="error">
            Check your email and try again.
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default NewsLetter;
