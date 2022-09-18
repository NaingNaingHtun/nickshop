import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import api from "../api";
import { Skeleton } from "@mui/material";
import { useLocation } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
const Products = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const pagesCount = Math.round(products.length / 8 + 0.4);
  let pagesRefs = [];
  pagesRefs.length = pagesCount;
  pagesRefs.fill(0);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const path = useLocation().pathname;
  //get all the products everytime filters changed
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      if (location.pathname === "/") {
        //if the products in the home page, then we should not have any filters except for the "sorting"
        filters = { sorting: "newest" };
      }
      //we can't have both title and category together when we're searching
      if (filters.category) {
        filters = { ...filters, title: "" };
      }
      if (filters.title) {
        filters = { ...filters, category: "" };
      }
      const search = new URLSearchParams(filters).toString();
      try {
        const res = await api.get(`/products/?${search}`);
        if (filters.sorting === "newest") {
          //"asc" or "desc"
          setProducts(res.data);
        } else {
          setProducts(res.data);
        }
        setCurrentProducts(res.data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProducts();
  }, [filters]);

  //pagination
  useEffect(() => {
    setCurrentProducts(
      products.slice((currentPageNumber - 1) * 8, 8 * currentPageNumber)
    );
  }, [currentPageNumber]);
  return (
    <React.Fragment>
      {loading ? (
        <div
          id="products"
          className="w-full grid gap-2 grid-cols-1 md:grid-cols-4"
        >
          {[1, 1, 1, 1, 1, 1, 1, 1].map((i, index) => (
            <div className="w-full md:w-full h-[300px]" key={index}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        path === "/products/" ? (
          <div className="w-full justify-center p-5 flex items-center">
            No Item Exit
          </div> //loading
        ) : (
          <div className="w-full justify-center p-5 flex items-center text-red-500">
            <ReportProblemIcon />
            <span>Please check your internet connection and try again.</span>
          </div>
        )
      ) : (
        <div>
          <div
            className={`w-full grid gap-2 py-2 grid-cols-1 md:grid-rows-${
              currentProducts.length <= 4 ? "1" : "2"
            } md:grid-cols-4`}
          >
            {path === "/"
              ? products
                  .slice(0, 8)
                  .map((product) => (
                    <Product product={product} key={product._id} />
                  ))
              : currentProducts.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
          </div>
          <div
            style={{ display: location.pathname === "/" ? "none" : "flex" }}
            className="flex justify-end items-center p-2"
          >
            <div className="flex gap-1 items-center mr-[50px]">
              <span>Go to:</span>
              <input
                min={1}
                max={pagesRefs.length}
                step={1}
                type="number"
                value={currentPageNumber}
                className="border-[1px] p-1 w-[50px]"
                onChange={(e) => setCurrentPageNumber(Number(e.target.value))}
              />
            </div>
            {pagesRefs.length > 10 ? (
              <React.Fragment>
                <button
                  className="px-2 py-1 border-[1px]"
                  onClick={() =>
                    setCurrentPageNumber((previousPageNumber) => {
                      if (previousPageNumber - 1 === 0) {
                        return 1;
                      } else {
                        return previousPageNumber - 1;
                      }
                    })
                  }
                >
                  Prev
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor: currentPageNumber === 1 ? "blue" : "white",
                    color: currentPageNumber === 1 ? "white" : "black",
                  }}
                  onClick={() => setCurrentPageNumber(1)}
                >
                  1
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor: currentPageNumber === 2 ? "blue" : "white",
                    color: currentPageNumber === 2 ? "white" : "black",
                  }}
                  onClick={() => setCurrentPageNumber(2)}
                >
                  2
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor: currentPageNumber === 3 ? "blue" : "white",
                    color: currentPageNumber === 3 ? "white" : "black",
                  }}
                  onClick={() => setCurrentPageNumber(3)}
                >
                  3
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor: currentPageNumber === 4 ? "blue" : "white",
                    color: currentPageNumber === 4 ? "white" : "black",
                  }}
                  onClick={() => setCurrentPageNumber(4)}
                >
                  4
                </button>
                <span className="text-4xl">...</span>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor:
                      currentPageNumber === pagesRefs.length - 3
                        ? "blue"
                        : "white",
                    color:
                      currentPageNumber === pagesRefs.length - 3
                        ? "white"
                        : "black",
                  }}
                  onClick={() => setCurrentPageNumber(pagesRefs.length - 3)}
                >
                  {pagesRefs.length - 3}
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor:
                      currentPageNumber === pagesRefs.length - 2
                        ? "blue"
                        : "white",
                    color:
                      currentPageNumber === pagesRefs.length - 2
                        ? "white"
                        : "black",
                  }}
                  onClick={() => setCurrentPageNumber(pagesRefs.length - 2)}
                >
                  {pagesRefs.length - 2}
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor:
                      currentPageNumber === pagesRefs.length - 1
                        ? "blue"
                        : "white",
                    color:
                      currentPageNumber === pagesRefs.length - 1
                        ? "white"
                        : "black",
                  }}
                  onClick={() => setCurrentPageNumber(pagesRefs.length - 1)}
                >
                  {pagesRefs.length - 1}
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  style={{
                    backgroundColor:
                      currentPageNumber === pagesRefs.length ? "blue" : "white",
                    color:
                      currentPageNumber === pagesRefs.length
                        ? "white"
                        : "black",
                  }}
                  onClick={() => setCurrentPageNumber(pagesRefs.length)}
                >
                  {pagesRefs.length}
                </button>
                <button
                  className="px-2 py-1 border-[1px]"
                  onClick={() =>
                    setCurrentPageNumber((previousPageNumber) => {
                      if (previousPageNumber + 1 > pagesRefs.length) {
                        return pagesRefs.length;
                      } else {
                        return previousPageNumber + 1;
                      }
                    })
                  }
                >
                  Next
                </button>
              </React.Fragment>
            ) : (
              pagesRefs.map((pageRef, index) => (
                <button
                  className="px-2 py-1 border-[1px]"
                  key={index}
                  onClick={() => setCurrentPageNumber(index + 1)}
                  style={{
                    backgroundColor:
                      currentPageNumber === index + 1 ? "blue" : "white",
                    color: currentPageNumber === index + 1 ? "white" : "black",
                  }}
                >
                  {index + 1}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Products;
