import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { login, updateUserAuthenticationStatus } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";
import api from "../api";
const SignIn = () => {
  const user = useSelector((state) => state.user.currentUser);
  const authenticating = useSelector((state) => state.user.authenticating);
  const authenticationError = useSelector(
    (state) => state.user.authenticationError
  );
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // validating the user access token
  useEffect(() => {
    const validateUser = async () => {
      await api
        .post("/auth/validate", {
          _id: user._id,
          accessToken: user.accessToken,
        })
        .then(() => {
          window.location.href = "/products";
          dispatch(updateUserAuthenticationStatus({ isAuthenticated: true }));
        })
        .catch(() => {
          navigate("/login");
          console.log("navigate to login");
        });
    };

    user && validateUser();
  }, [user, dispatch, navigate]);

  return (
    <div className="mt-3 w-full">
      {authenticationError && (
        <div className="text-red-500 text-center">
          <ErrorIcon />
          <span className="ml-1">Incorrect Email or Password!</span>
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="p-2 outline-none border-[1px]"
          autoFocus={true}
          style={{ borderColor: authenticationError ? "red" : "" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="p-2 outline-none border-[1px]"
          style={{ borderColor: authenticationError ? "red" : "" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton type="submit" disabled={authenticating}>
          {authenticating ? "signing in..." : "Sign In"}
        </PrimaryButton>
        <div className="text-center text-gray-500 text-sm cursor-pointer">
          Forgot password?
        </div>
      </form>
    </div>
  );
};

export default SignIn;
