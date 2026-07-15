import { useMemo , useState } from "react";

export default function Settings() {

  let handleClick=()=>{
    console.log("I am handle Click");

  }

  return (
    <div>
      <button onClick={handleClick}>Click </button>
    </div>
  )
}
