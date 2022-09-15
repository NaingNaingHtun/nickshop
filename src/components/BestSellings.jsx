import React from "react";
import BestSellingItem from "./BestSellingItem";
import { Skeleton } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const BestSellings = ({ bestSellings, loading, error }) => {
  return (
    <div className="py-[50px] md:px-[50px] w-[100vw] flex flex-col justify-center items-center border-t-[2px] border-black">
      <div className="text-4xl p-2 mb-5">
        <span className="font-bold tracking-wide mb-5 header-font border-[2px] border-black border-r-0 border-l-0">
          Best Sellings
        </span>
      </div>

      {error ? (
        <div className="text-red-500 flex items-center">
          <ReportProblemIcon />
          <span>Cann't Connect to the server. Try again later.</span>
        </div>
      ) : loading ? (
        <div className="w-[100vw] flex flex-col md:flex-row gap-1">
          {[1, 2, 3].map((item) => (
            <div className="flex-1 h-[300px]" key={item}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[100vw] md:w-full flex flex-col md:flex-row gap-1">
          {bestSellings.map((item, index) => (
            <BestSellingItem item={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellings;
