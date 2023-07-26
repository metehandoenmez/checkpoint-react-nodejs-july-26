import React, {useState} from "react";
import { API_URL } from "./App";

type PostCompArguments = {
  id: number;
  text: string;
  deleteItem: Function;
  updateData: Function;
}

export default function PostComponent({id, text, deleteItem, updateData}:PostCompArguments) {

  const [tempText, setTempText] = useState<string>(text)

  const handleUpdate = async (id: number, text: string) => {
    await fetch(API_URL + "/" + id, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    let logText = "The data is updated successfully."
    updateData(logText);
    }
  
  

  return(
    <div>
      <input type="text" style={id%2 === 0 ? {color:"red"} : {color: "blue"}} value={tempText} onChange={(ev) => {
        let inputText = ev.target.value;
        setTempText(inputText);
      }}></input>
      <button onClick={()=> handleUpdate(id, tempText)}>Update</button>
      <button onClick={()=> deleteItem(id)}>Delete</button>
    </div>
  )
}
