import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "./MainCard";
import { useGlobalContext } from "../context/AppContext";

const api = process.env.REACT_APP_API_URL;
const AddProduct = () => {
  const { mleft } = useGlobalContext();
  const userId = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          quantity,
          category,
          userId,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Cannot fetch Request");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const ml = mleft + 'px'
  // style={{marginLeft: `${ml}`, transition: "all 0.5s linear"}}
  return (
    <MainCard className="min-h-[80vh] bg-white m-auto rounded-2xl py-4 my-6 mt-20 w-[80%]">
      <h1 className="inline-block font-bold w-full text-center my-6 text-sm md:text-lg">
        Add Form
      </h1>
      <form
        onSubmit={submitHandler}
        className="flex items-start justify-start flex-wrap max-w-[80%] m-auto"
      >
        <div className="inline-flex flex-col w-[100%] md:w-[50%] p-2">
          <label className="mb-1 capitalize mr-2 text-sm md:text-lg">name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-[#333] rounded-sm w-[80%]"
          />
        </div>
        <div className="inline-flex flex-col w-[100%] md:w-[50%] p-2">
          <label className="mb-1 capitalize mr-2 text-sm md:text-lg">description</label>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-[#333] rounded-sm w-[80%]"
          />
        </div>
        <div className="inline-flex flex-col w-[100%] md:w-[50%] p-2">
          <label className="mb-1 capitalize text-sm md:text-lg mr-2">price</label>
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-[#333] rounded-sm w-[80%]"
          />
        </div>
        <div className="inline-flex flex-col w-[100%] md:w-[50%] p-2">
          <label className="mb-1 capitalize text-sm md:text-lg mr-2">quantity</label>
          <input
            type="number"
            placeholder="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-2 border-[#333] rounded-sm w-[80%]"
          />
        </div>
        <div className="inline-flex flex-col w-[100%] md:w-[50%] p-2">
          <label className="mb-1 capitalize text-sm md:text-lg mr-2">category</label>
          <input
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-[#333] rounded-sm w-[80%]"
          />
        </div>
        {/* <div className="flex items-start justify-start flex-col">
                <label  className="capitalize">createdAt</label>
                <input type="date" placeholder="createdAt"/>
            </div> */}
        {/* <div className="flex items-start justify-start flex-col">
                <label  className="capitalize">updatedAt</label>
                <input type="date" placeholder="updatedat"/>
            </div> */}
        <div className="w-full">
          <button className="block bg-[#28A745] text-[#F9F9F9] py-2 px-4 my-2 rounded-md">
            Add Product
          </button>
        </div>
      </form>
    </MainCard>
  );
};

export default AddProduct;
