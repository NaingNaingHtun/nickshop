import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import useQuery from "../hook/useQuery";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { updateFilter } from "../slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
const people = [
  { label: "All Gender", value: "" },
  {
    label: "Men",
    value: "men",
  },
  { label: "Women", value: "women" },
];

const productsTypes = [
  {
    label: "All Categories",
    value: "",
  },
  {
    label: "Glasses",
    value: "glasses",
  },
  { label: "Hat", value: "hat" },
  { label: "Coat", value: "coat" },
  { label: "Shirt", value: "shirt" },
  { label: "Pant", value: "pant" },
  { label: "Shoe", value: "shoe" },
];

const capitalize = (str) => {
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1, str.length);
  return capitalizedStr;
};

const ProductsList = () => {
  const dispatch = useDispatch();
  const prevFilters = useSelector((state) => state.filter);
  // console.log(prevFilters);
  const sizes = ["sm", "md", "lg", "xl"];
  const sortingOptions = [
    { value: "newest", label: "Newest" },
    { label: "Price (asc)", value: "asc" },
    { label: "Price (desc)", value: "desc" },
  ];
  const query = useQuery();
  const title = query.get("title") ? query.get("title") : "";
  const [size, setSize] = useState(prevFilters.size ? prevFilters.size : "");
  const [sorting, setSorting] = useState(
    prevFilters.sorting
      ? { label: capitalize(prevFilters.sorting), value: prevFilters.sorting }
      : { label: "Newest", value: "newest" }
  );
  const [peopleType, setPeopleType] = useState(
    prevFilters.for
      ? { label: capitalize(prevFilters.for), value: prevFilters.for }
      : { label: "All Gender", value: "" }
  );
  const [category, setCategory] = useState(
    prevFilters.category && !title
      ? {
          label: capitalize(prevFilters.category),
          value: prevFilters.category,
        }
      : {
          label: "All Categories",
          value: "",
        }
  );
  // console.log("category: " + category.value);
  let filters = {
    size,
    for: peopleType.value,
    category: category.value,
    title,
    sorting: sorting.value,
  };

  // useEffect(() => {
  //   if (title) {
  //     setCategory({ label: "All Categories", value: "" });
  //   } else {
  //     setCategory(
  // prevFilters.category
  //   ? {
  //       label: capitalize(prevFilters.category),
  //       value: prevFilters.category,
  //     }
  //   : {
  //       label: "All Categories",
  //       value: "",
  //     }
  //     );
  //   }
  // }, [title]);
  useEffect(() => {
    dispatch(updateFilter(filters));
  }, [filters]);
  //================HANDLERS===============
  return (
    <div className="mt-2">
      <Navbar />

      <div className="h-16" />
      <Announcement />
      <div className="p-5 bg-white">
        <h1 className="text-3xl font-bold capitalize">{category.value}</h1>
        <div className="mt-5 flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-2 items-center">
                <span>Gender:</span>
                <Select
                  options={people}
                  value={peopleType}
                  onChange={(option) => setPeopleType(option)}
                  className="min-w-[100px]"
                />
              </div>
              <div className="flex gap-2 items-center">
                <span>Categories:</span>
                <Select
                  value={category}
                  options={productsTypes}
                  onChange={(option) => setCategory(option)}
                  className="min-w-[100px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span>Sizes:</span>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <div
                    key={s}
                    className="border-[1px] border-black py-1 px-2 rounded-lg cursor-pointer hover:text-white hover:bg-blue-500"
                    onClick={() => setSize(s)}
                    style={{
                      backgroundColor: s === size ? "blue" : "white",
                      color: s === size ? "white" : "black",
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Sort Products:</span>
            <DropDown
              options={sortingOptions}
              value={sorting}
              onChange={(option) => setSorting(option)}
            />
          </div>
        </div>
      </div>
      <Products filters={filters} />

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ProductsList;
