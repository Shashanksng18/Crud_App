import React, { useRef } from "react";
import MainCard from "./MainCard";
import { useGlobalContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const sidebarRef = useRef();
  const {
    openSidebar,
    closeSidebar,
    sidebarWidth,
    sidebarActive,
    setSidbarActive,
  } = useGlobalContext();

  const openSidbearHandler = () => {
    setSidbarActive(true);
    const l = sidebarRef.current;
    openSidebar();
  };

  const closeSidebarHandler = () => {
    closeSidebar();
    setSidbarActive(false);
  };
  return (
    <MainCard
      className={`bg-[#3C4043] text-white w-[100px] ml-4 h-[80vh] fixed top-20 rounded-2xl cursor-pointer shadow-2xl transition-all duration-1000`}
      onmouseover={openSidbearHandler}
      onmouseout={closeSidebarHandler}
      ref={sidebarRef}
    >
      <nav className="flex item-center justify-center m-auto text-[12px] flex-col gap-10 list-none  py-4 ">
        <li>
          <NavLink to="/">Products</NavLink>
        </li>
        <li>
          <NavLink to="/add_product">Add Products</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </nav>
    </MainCard>
  );
};

export default Sidebar;
