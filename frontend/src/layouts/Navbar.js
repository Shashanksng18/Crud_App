import React, { useEffect, useState, useRef } from "react";
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { VscThreeBars } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";

const api = process.env.REACT_APP_API_URL;
const Navbar = () => {

  const {toggle, setToggle} = useGlobalContext();
  const { userName, setUserName } = useGlobalContext();

  

  const isUserLogin = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${api}/logout`, {
        credentials: "include",
      });
      localStorage.clear("user");
      setUserName("");
      if (!response.ok) {
        throw new Error("error while logout");
      }
      const result = await response.json();

      if (result) {
        navigate("/signup");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setToggle(false);
    }
  };

  const openSidbearHandler = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  return (
    <nav className="flex item-center relative justify-start gap-10 list-none  pl-4 md:pl-20 md:gap-4 md:flex-row">
      {toggle ? (
       <RxCross2 size={20} className="fixed top-4 z-[9999] md:hidden text-[#F9F9F9]" onClick={openSidbearHandler} />
      ) : (
        <VscThreeBars size={20} className="fixed top-4 z-[9999] md:hidden text-[#F9F9F9]" onClick={openSidbearHandler} />
      )}
      {loading && (
        <div className="flex item-center justify-center fixed top-0 left-0 bg-[#2d2828] bg-opacity-30 w-full h-full">
          <article className="flex item-center justify-center m-auto">
            <span className="w-[48px] h-[48px] border-[5px] border-solid border-[#F9F9F9] border-b-[#1A73E8] rounded-[50%] inline-block animate-spin"></span>
          </article>
        </div>
      )}
      <ul
        className={`flex items-center bg-[#3c4043] z-[99] py-4 left-0 fixed top-0 justify-start gap-6 w-full flex-col  md:flex-row md:pl-28 md:translate-y-0 ${toggle ? `translate-y-0 transition-all duration-700` : `-translate-y-96 transition-all duration-700`}`}
      >
        <li className="mb-2 mt-6 md:m-0 md:mb-0">
          <NavLink className="text-[#F9F9F9] text-sm md:text-[16px]" to="/" onClick={()=>setToggle(false)}>
            Products
          </NavLink>
        </li>
        <li className="mb-2 md:mb-0">
          <NavLink className="text-[#F9F9F9] text-sm md:text-[16px]" to="/add_product" onClick={()=>setToggle(false)}>
            Add Products
          </NavLink>
        </li>
        {!isUserLogin && (
          <li className="mb-2 md:mb-0">
            <NavLink className="text-[#F9F9F9] text-sm md:text-[16px]" to="/signup" onClick={()=>setToggle(false)}>
              Signup
            </NavLink>
          </li>
        )}
        {isUserLogin && (
          <li>
            <NavLink className="text-[#F9F9F9] text-sm md:text-[16px]" onClick={logoutHandler}>
              Logout
            </NavLink>
          </li>
        )}
         {isUserLogin && (
        <li className="absolute md:right-10 top-2 text-[#F9F9F9] text-sm md:text-[16px]  flex md:top-auto">
          Welcome😎  &nbsp;{userName}
        </li>
      )}
      </ul>
     
    </nav>
  );
};

export default Navbar;
