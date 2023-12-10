import React from "react";
import Input from "./Input";

export default function Rows(props) {
  const handleChangeData = (event) => {
    let { name, value } = event.target;
    console.log("name  , value", name, "   ", value);
    props.setRows(props.rows.map((item,id)=>{
        
        item[name] = value;
        return item;
      }
    ));
  };
  return (
    <div>
      <Input
        type="text"
        name="Praticulars"
        placeholder="Particulars"
        value={props.rows.Particulars}
        onChange={(event) => handleChangeData(event)}
      />
      <Input
        type="text"
        name="HSNSACCode"
        placeholder="HSN/SAC code"
        value={props.rows.HSNSACCode}
        onChange={(event) => handleChangeData(event)}
      />
      <Input
        type="text"
        name="Units"
        placeholder="Units"
        value={props.rows.Units}
        onChange={(event) => handleChangeData(event)}
      />
      <Input
        type="number"
        name="Qty"
        placeholder="Qty"
        value={props.rows.Qty}
        onChange={(event) => handleChangeData(event)}
      />
      <Input
        type="float"
        name="rate"
        placeholder="rate"
        value={props.rows.rate}
        onChange={(event) => handleChangeData(event)}
      />
      <Input
        type="float"
        name="Cgst"
        placeholder="Cgst"
        value={props.rows.Cgst}
        onChange={(event) => handleChangeData(event)}
      />
      <Input
        type="float"
        name="SGST"
        placeholder="SGST"
        value={props.rows.Sgst}
        onChange={(event) => handleChangeData(event)}
      />
    </div>
  );
}
