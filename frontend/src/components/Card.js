import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
import { useGlobalContext } from "../context/AppContext";

const api = process.env.REACT_APP_API_URL;
const Card = ({
  name,
  description,
  price,
  quantity,
  category,
  createdAt,
  updatedAt,
  updateHandler,
  id,
  deleteHandler
}) => {

  const {showProductDetail, setShowProductDetail, setViewProduct} = useGlobalContext();
  updatedAt = new Date(updatedAt);
  const currentDate = new Date();

  const lastUpdatedAt = currentDate.getDate() - updatedAt.getDate();

  const confirmDeleteHandler = (id) => {
    const confirmDelete = window.confirm("delete item confirm?");
    if (confirmDelete) {
      deleteHandler(id);
    }
  };
  

  createdAt = new Date(createdAt);
  const cDate = createdAt.getDate();
  const cMonth = createdAt.getMonth();
  const cYear = createdAt.getFullYear();

  createdAt = `${`${cDate} - ${cMonth} - ${cYear}`}`;

  const viewProductHandler = async (id) => {

    const {data: {data}} = await axios.get(`${api}/get/${id}`);
    setShowProductDetail(true);
    setViewProduct(data);
  }

  return (
    <div className="flex justify-center items-stretch w-full">
      <div className="font-serif inline-block w-[150px] capitalize text-sm border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0">
        <p className="break-all">{name}{" "}</p>
        <span className="text-[10px] text-[#41f01e] font-bold inline-block w-full">
          cr_date : {createdAt}
        </span>{" "}
        <span className="text-[10px] text-[#007BFF] font-bold inline-block w-full">
          up_date :{" "}
          {isNaN(lastUpdatedAt) ? "no update" : `${lastUpdatedAt} days ago`}{" "}
        </span>
      </div>
      <div className="font-serif inline-block w-[200px] capitalize text-sm border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0 border-l-0">
        {description}
      </div>
      <div className="font-serif inline-block w-[150px] capitalize text-sm border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0 border-l-0">
        <span className="font-bold">&#8377;</span>
        {price}
      </div>
      <div className="font-serif inline-block w-[150px] capitalize text-sm border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0 border-l-0">
        {quantity}
      </div>
      <div className="font-serif inline-block w-[150px] capitalize text-sm border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0 border-l-0">
        {category}
      </div>
      {/* <div className="font-serif inline-block w-[150px] capitalize text-sm border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0 border-l-0">{createdAt}</div> */}
      <div className="font-serif flex w-[200px] capitalize text-sm border-2 border-[#F9F9F9] text-[#F9F9F9] px-4 border-b-0 border-l-0 items-center justify-center">
      <button
          className="px-2"
          onClick={()=>viewProductHandler(id)}
        >
          <FaEye/>
        </button>
        <button
          className="flex h-[30px] mr-4 text-[#F9F9F9] capitalize items-center justify-center bg-[#1A73E8] leading-normal px-2 rounded-sm"
          onClick={() => updateHandler(id)}
        >
          <GrEdit className="mr-2" />
          edit
        </button>
        <button
          className="flex h-[30px] text-[#F9F9F9] capitalize items-center justify-center bg-[#e36151] leading-normal px-2 rounded-sm"
          onClick={() => confirmDeleteHandler(id)}
        >
          <MdDelete className="mr-2" />
          delete
        </button>
      </div>
    </div>
  );
};

export default Card;
