import "./App.css";
import Invoice from "./components/Invoice";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import View from "./components/View";
import { useState } from "react";
import { DataContext } from "./Context/DataContext";
import NavBar, { Copyright } from "./components/NavBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageNotFound from "./Layout/PageNotFound";

function App() {
  let [data, setData] = useState({
    Ms: "",
    InvoiceNo: "",
    InvoiceDate: "",
    DC: "",
    DCDate: "",
    GSTINNumber: "",
    vendorCode: "",
    PONo: "",
    PODate: "",
  });
  let [rows, setRows] = useState([
    {
      id: 1,
      Particulars: "",
      HSNSACCode: "",
      Units: "",
      Qty: "",
      rate: "",
      Cgst: "",
      Sgst: "",
    },
  ]);

  return (
    <div className="App">
      <NavBar />
      <DataContext.Provider value={{ data, setData ,rows, setRows }}>
      <Routes>
        <Route exact path="/" element={<Invoice />}></Route>
        <Route exact path="/invoice" element={<Invoice />}></Route>
        <Route exact path="/view" element={<View/>}></Route>
        <Route path="/*" element={<PageNotFound/>} ></Route>
      </Routes>
      </DataContext.Provider>
      <Container
          // maxWidth="md"
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 6,
            py: [3, 3],
          }}
        >
          <Grid container spacing={4} justifyContent="space-evenly">
           
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Container>
    </div>
  );
}

export default App;
