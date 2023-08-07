import { useState } from "react";
import "./App.css";
import Picture from "./components/Picture";

function App() {
  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState([])
  // const key = "1IhyhAJf3yl8bogFJqGJxJOgoXFRBnmE-XFFqbj0N-A";

  function checkSearch(e) {
    e.preventDefault();
    if (!search) {
      alert("กรุณาป้อนชื่อรูปภาพ");
    } else {
      fetchImageFromAPI();
      // console.log(import.meta.env)
    }
  }
  async function fetchImageFromAPI() {
    // const url = `https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${key}&per_page=15`;
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${search}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`;
    const res = await fetch(url);
    const data = await res.json()
    const result= data.results
    if(result.length==0){
      alert("ไม่พบรูปภาพนี้")
      setSearch("")
    }else{
      setPhotos(result)
      console.log(result)
    }
  }
  return (
    <>
      <h1>ระบบค้นหารูปภาพด้วย API</h1>
      <form onSubmit={checkSearch}>
        <input
          type="text"
          placeholder="ป้อนชื่อรูปภาพที่ต้องการค้นหา"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">ค้นหา</button>
      </form>
      <div className="search-result">
      {photos.map((data,index)=>{
        return <Picture key={index} {...data}/>
      })}
      </div>
    </>
  );
}

export default App;
