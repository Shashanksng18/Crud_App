import React from "react";
import { useGlobalContext } from "../context/AppContext";
import MainCard from "./MainCard";
import { RxCross2 } from "react-icons/rx";

const ProductDetail = () => {

    const {viewProduct, setShowProductDetail} = useGlobalContext();

    return(
        <div className="fixed top-0 left-0 w-full h-lvh bg-[#1A73E8] bg-opacity-55 z-[99999]">
            <MainCard className={`bg-[#F9F9F9] rounded-xl w-3/4 md:w-1/2 h-1/2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
               <button className="fixed right-4 top-4" onClick={() => setShowProductDetail(false)}><RxCross2 size={20}/></button>
               <div className="flex items-start justify-center flex-col gap-4 text-sm md:text-lg">
                  <h3>Name : {viewProduct.name}</h3>
                  <p>Description : {viewProduct.description}</p>
                  <span>Price : {viewProduct.price}</span>
                  <span>Quantity : {viewProduct.quantity}</span>
                  <p>Category : {viewProduct.category}</p>
               </div>
            </MainCard>
        </div>
    )
}

export default ProductDetail;