import React from "react";
import Input1 from "@mui/material/Input"
export default function Input(props) {
  return (
    <div>
      <Input1
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        name = {props.name}
        sx={{width: "250px", textAlign:"center" }}
      />
    </div>
  );
}
