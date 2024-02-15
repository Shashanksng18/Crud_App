import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import MainCard from "./MainCard";
import { useGlobalContext } from "../context/AppContext";
import ProductDetail from "./ProductDetail";

const api = process.env.REACT_APP_API_URL;
const Product = () => {
  const { setUserName, showProductDetail} = useGlobalContext();

  const userLoginId = JSON.parse(localStorage.getItem("user"));

  const { currentWidth, mleft } = useGlobalContext();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  // console.log(api)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fetchProducts = async () => {
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);
      const {
        data: { data, email },
      } = await axios.get(`${api}/products`);
      setUserName(email);
      setProducts(data);
      localStorage.setItem("login_user", JSON.stringify(email));
    } catch (error) {
      console.log(error);
      let err = error.response.data;
      console.log(err.data);
      setError(err.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const deleteHandler = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${api}/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unauthorized Permission");
      }
      fetchProducts();
    } catch (error) {
      window.confirm(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ml = mleft + "px";

  // style={{marginLeft: `${ml}`, transition: "all 0.5s linear"}}
  return (
    <MainCard
      className={`overflow-x-scroll  h-[80vh] bg-[#3C4043]  m-auto my-6 rounded-2xl  w-[80%] mt-20`}
    >
      <div className="w-[1050px]">
        <div className="flex items-start justify-center mt-10 m-auto">
          <h1 className="font-bold capitalize py-2 inline-block w-[150px] border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0 rounded-tl-md ">
            name
          </h1>
          <h1 className="font-bold capitalize py-2 border-2 border-[#F9F9F9] text-[#F9F9F9] inline-block w-[200px]  px-4 border-b-0 border-l-0">
            description
          </h1>
          <h1 className="font-bold capitalize py-2 inline-block w-[150px] border-2 border-[#F9F9F9] text-[#F9F9F9]  px-4 border-b-0 border-l-0">
            price
          </h1>
          <h1 className="font-bold capitalize py-2 inline-block w-[150px] border-2 border-[#F9F9F9] text-[#F9F9F9]  px-4 border-b-0 border-l-0">
            quantity
          </h1>
          <h1 className="font-bold capitalize py-2 inline-block w-[150px] border-2 border-[#F9F9F9] text-[#F9F9F9]  px-4 border-b-0 border-l-0">
            category
          </h1>
          {/* <h1 className="font-bold capitalize py-2 inline-block w-[150px] border-2 border-[#F9F9F9] text-[#F9F9F9]  px-4 border-b-0 border-l-0">
            createdAt
          </h1>
          <h1 className="font-bold capitalize py-2 inline-block w-[150px] border-2 border-[#F9F9F9] text-[#F9F9F9]  px-4 border-b-0 border-l-0">
            updatedAt
          </h1> */}
          <h1 className="font-bold capitalize py-2 inline-block w-[200px] border-2 border-[#F9F9F9] text-[#F9F9F9]  px-4 border-b-0 border-l-0 rounded-tr-md">
            Actions
          </h1>
        </div>
        <div>
          {loading ? (
            <div className="flex item-center justify-center fixed top-0 left-0 bg-[#2d2828] bg-opacity-30 w-full h-full">
              <article className="flex item-center justify-center m-auto">
                <span className="w-[48px] h-[48px] border-[5px] border-solid border-[#F9F9F9] border-b-[#1A73E8]  rounded-[50%] inline-block animate-spin"></span>
              </article>
            </div>
          ) : (
            <div className="[&>*:last-child>div]:border-b-2 [&>*:last-child>div]:pb-6">
              {products.map((product, index) => {
                const {
                  name,
                  description,
                  quantity,
                  price,
                  category,
                  createdAt,
                  updatedAt,
                  _id,
                } = product;
                return (
                  <Card
                    name={name}
                    description={description}
                    quantity={quantity}
                    category={category}
                    price={price}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    id={_id}
                    updateHandler={updateHandler}
                    deleteHandler={deleteHandler}
                    index={index}
                    key={index}
                  />
                );
              })}
            </div>
          )}
          {products.length == 0 && (
            <div className="flex items-center justify-center border-2 w-[1000px] m-auto border-[#F9F9F9] py-20">
              <h1>{error?.toUpperCase()}</h1>
            </div>
          )}
        </div>
      </div>
     {showProductDetail && <ProductDetail/> }
    </MainCard>
  );
};

export default Product;
