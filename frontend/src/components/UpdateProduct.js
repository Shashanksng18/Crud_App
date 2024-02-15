import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const api = process.env.REACT_APP_API_URL;
const UpdateProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${api}/get/${id}`);

      if (!response.ok) {
        throw new Error("Cannot Fetch Data");
      }
      const dataResponse = await response.json();

      const { data } = dataResponse;
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setQuantity(data.quantity);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);
  const updateHandler = async (e) => {
    e.preventDefault();
    const updatedAt = Date.now();
    try {
      const response = await fetch(`${api}/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          quantity,
          category,
          updatedAt,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Cannot fetch Request");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="min-h-[80vh] w-[80%] bg-white m-auto rounded-2xl py-4 my-6 mt-20">
      {loading ? (
        <div className="flex item-center justify-center fixed top-0 left-0 bg-[#2d2828] bg-opacity-30 w-full h-full">
          <article className="flex item-center justify-center m-auto">
            <span className="w-[48px] h-[48px] border-[5px] border-solid border-white border-b-[#1A73E8]  rounded-[50%] inline-block animate-spin"></span>
          </article>
        </div>
      ) : (
        <>
          <h1 className="inline-block font-bold w-full text-center my-6 text-sm md:text-lg">
            Update Form
          </h1>
          <form
            onSubmit={updateHandler}
            className="flex items-start justify-start flex-wrap max-w-[80%] m-auto"
          >
            <div className="inline-flex flex-col w-[100%] md:w-[50%] p-2">
              <label className="mb-1 capitalize text-sm md:text-lg mr-2">name</label>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-[#333] rounded-sm w-[80%]"
              />
            </div>
            <div className="inline-flex flex-col w-[100%] md:w-[50%] p-2">
              <label className="mb-1 capitalize text-sm md:text-lg mr-2">description</label>
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
            {/* <div className="inline-block w-[50%] p-2">
                <label  className="capitalize">createdAt</label>
                <input type="date" placeholder="createdAt"/>
            </div> */}
            {/* <div className="inline-block w-[50%] p-2">
                <label  className="capitalize">updatedAt</label>
                <input type="date" placeholder="updatedat"/>
            </div> */}
            <div className="w-full">
              <button className="block bg-[#007BFF] text-[#F9F9F9] py-2 px-4 my-2 rounded-md">
                Update Product
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default UpdateProduct;
