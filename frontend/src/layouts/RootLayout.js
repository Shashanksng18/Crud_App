import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import Sidebar from "../components/Sidebar";


const RootLayout = () => {
    return(
        <>
         <Navbar/>
         <Outlet/>
         <Footer/>
        </>
    )
}

export default RootLayout;
