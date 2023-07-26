import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import PostComponent from "./PostComponent";

export const API_URL:string = "http://localhost:3001/api/posts"

function App() {

  type Post = {
    id: number;
    text: string;
  };

  const inputRef = useRef();
  const [postList, setPostList] = useState<Post[]>([])

  const getPosts = async (text) => {
    const response = await fetch(API_URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type":"application/json"
      }
    });
    let data = await response.json()
    setPostList(data)
    console.log(text);
    console.log(data);
    
    
  }

  const handleDelete = async (id) => {
    
      await fetch(API_URL + "/" + id, {
        method: "DELETE",
        mode: "cors",
      })
    let logTextDelete = "The data is deleted successfully."
    getPosts(logTextDelete);
   ;
 }

  useEffect(()=> {
    let logTextMount = "The data is fetched successfully after mount."
    getPosts(logTextMount);
  }, [])

  
  return <div className="main-content">
    <input type="text" ref={inputRef} placeholder="Enter your post text..."/>
    <button onClick={async() => {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({text: inputRef.current.value})
      })
      let logTextAdd = "The data is added successfully."
      getPosts(logTextAdd);
    }}>Save</button>
    <button onClick={() => {let sortedList = [...postList] 
      sortedList.sort((a,b)=> a.id - b.id);
      setPostList(sortedList)}}>
        Sort By Increasing ID</button>
        <button onClick={() => {let sortedList = [...postList] 
      sortedList.sort((a,b)=> b.id - a.id);
      setPostList(sortedList)}}>
        Sort By Decreasing ID</button>    <div>
      {postList.map((el) => 
         (<PostComponent id={el.id} text={el.text} key={el.id + "key"} deleteItem={handleDelete} updateData={getPosts}></PostComponent>)
      )}
    </div>
  </div>;
}

export default App;
