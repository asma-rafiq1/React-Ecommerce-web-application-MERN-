import React from "react";
import "./Home.css";
import * as md from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchItem = () => {

  const [search, setSearch] = React.useState();
  const navigate=useNavigate()

  const onSendSearchedItem=()=>{
    navigate(`/products?keyword=${search}`)
  }
  return (
    <div className="searchbar">
      <md.MdSearch className="searchicon" size={20} />
      <input
        className="searchBarInput"
        placeholder="Search for shoes clothing etc"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e)=>e.key==='Enter'?onSendSearchedItem() : null}
      />
    </div>
  );
};

export default SearchItem;
