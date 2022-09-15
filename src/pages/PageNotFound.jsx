import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-[100vw] h-[100vh]">
      <div className="text-5xl text-blue-500 font-bold">404</div>
      <p className="text-2xl">
        Oops! Something Went Wrong. The page you are looking is not found.
      </p>
      <Link to="/" className="underline">
        Go To Home
      </Link>
    </div>
  );
};

export default PageNotFound;
