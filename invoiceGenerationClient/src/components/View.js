import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackDrop from "./BackDrop";

export default function View(props) {
  const location = useLocation();
  console.log("location : ", location.state);
  const [viewData, setViewData] = useState("");
  const [open, setOpen] = useState(false);
  const styles = {
    page: {
      width: '25cm',
      minHeight: '29.7cm',
      margin: '1cm auto ',
      border: '1px solid #ccc',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    content: {
      
    },
  };
  useEffect(() => {
    const ax = async () => {
      try {
        setOpen(true);
        let response = await axios.post("/view", {
          data: location.state.data,
          rows: location.state.rows,
        });
        //   console.log("ffffffff : ",response.data);
        if (response.data.html) {
          console.log(response.data.html);
          setViewData(response.data.html);
        } else {
          alert("error in generation html");
        }
        setOpen(false);
      } catch (error) {
        setOpen(false);
        alert(`Internal Server Error ${error}`);
      }
    };
    if (location.state) ax();
  }, []);
  if (location.state)
    return (
      <div style={styles.page}>
        <div style={styles.content}  dangerouslySetInnerHTML={{ __html: viewData }}></div>
        {open && <BackDrop open />}
      </div>
    );
  else
    return (
      <div>
        <h2>Page Not Found</h2>
      </div>
    );
}
