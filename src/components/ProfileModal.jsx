import React from "react";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import api from "../api";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
const ProfileModal = ({ open, handleClose }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [updating, setUpdating] = useState(false);
  const [firstName, setFirstName] = useState(user?.username.split(" ")[0]);
  const [lastName, setLastName] = useState(user?.username.split(" ")[1]);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  //modal position style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
  };
  //==================FUNCTIONS================
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const updatedUser = await api
      .put(
        `/users/${user._id}`,
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then(() => {
        setSuccessUpdate(true);
        setTimeout(() => setSuccessUpdate(false), 3000); //after 1 second, hide the "updated successfully" message
      })
      .catch((err) => {
        setUpdating(false);
        if (err.response.status === 401) {
          setPasswordError(true);
          console.log(err.response.data);
        }
      });
    setUpdating(false);
    console.log(updatedUser);
  };
  //handle cancel
  const handleCancel = () => {
    handleClose();
    setFirstName(user?.username.split(" ")[0]);
    setLastName(user?.username.split(" ")[1]);
    setEmail(user?.email);
    setPasswordError(false);
  };
  //hide the password error message when the user changes one of these
  useEffect(() => {
    setPasswordError(false);
  }, [firstName, lastName, email, oldPassword, newPassword]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="rounded-lg">
          <div className="text-right" onClick={handleClose}>
            <CloseIcon className="cursor-pointer" />
          </div>
          <form className="flex flex-col gap-2 p-1" onSubmit={handleSubmit}>
            <label htmlFor="firstName">FirstName:</label>
            <input
              className="p-1 border-[1px] border-black outline-none"
              type="text"
              defaultValue={firstName}
              id="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">LastName:</label>
            <input
              className="p-1 border-[1px] border-black outline-none"
              type="text"
              id="lastName"
              defaultValue={lastName}
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="p-1 border-[1px] border-black outline-none"
              type="text"
              id="email"
              name="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              className="p-1 border-[1px] border-black outline-none"
              type="tel"
              id="phone"
              name="phone"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="address">Address:</label>
            <input
              className="p-1 border-[1px] border-black outline-none"
              type="text"
              id="address"
              name="address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {changePassword ? (
              <React.Fragment>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  className="p-1 border-[1px] border-black outline-none"
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                {passwordError && (
                  <div className="text-red-500">Password is incorrect</div>
                )}
                <label htmlFor="newPassword">New Password</label>
                <input
                  className="p-1 border-[1px] border-black outline-none"
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="border-[1px] p-1.5 self-start"
                  onClick={() => setChangePassword(false)}
                >
                  Cancel
                </button>
              </React.Fragment>
            ) : (
              <div className="flex items-center gap-1">
                <label htmlFor="password">Password:</label>
                <button
                  className="bg-black text-white p-1.5 cursor-pointer"
                  onClick={() => setChangePassword(true)}
                >
                  New Password
                </button>
              </div>
            )}

            <div className="flex justify-end items-center gap-1">
              {updating ? (
                <button className="bg-white text-white p-1.5">
                  Updating...
                </button>
              ) : (
                <React.Fragment>
                  {successUpdate && (
                    <div className="flex-1 text-green-500">
                      Updated Successfully. You will see your changes when you
                      login again.
                    </div>
                  )}
                  <div className="flex gap-1">
                    <button
                      className=" border-[1px] p-1.5"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className=" bg-black text-white p-1.5"
                    >
                      Update
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
