import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center bg-sky-600 w-screen h-[74px] text-white">
      <h3 className="ml-2.5 font-[Crimson Pro] text-3xl">BooksHub</h3>
      <button className="ml-12 text-2xl" onClick={() => navigate("/")}>
        Home
      </button>
      <button className="ml-12 text-2xl" onClick={() => navigate("/addbook")}>
        AddBook
      </button>
    </div>
  );
}

export default Navbar;
