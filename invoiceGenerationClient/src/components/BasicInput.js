import Input from "./Input";
import Label from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";

export default function BasicInput() {
  let { data, setData } = useContext(DataContext);
  const handleChangeData = (event) => {
    let { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 12, md: 12 }}
        sx={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={12} md={4}>
          <Label>M/s</Label>
          <Input
            type="text"
            name="Ms"
            placeholder="M/s"
            value={data.Ms}
            onChange={(event) => {
              console.log("inside", event.target.value);
              if (event.target.value.length < 120) {
                console.log("inside");
                handleChangeData(event);
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Label>Invoice &nbsp;No</Label>
          <Input
            type="text"
            name="InvoiceNo"
            placeholder="InvoiceNo"
            value={data.InvoiceNo}
            onChange={(event) => {
              if (event.target.value.length < 15) handleChangeData(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Label style={{ display: "inline-flex" }}>Invoice &nbsp; Date </Label>
          <Input
            type="date"
            name="InvoiceDate"
            placeholder="InvoiceDate"
            value={data.InvoiceDate}
            onChange={(event) => {
              handleChangeData(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Label>DC </Label>
          <Input
            type="text"
            name="DC"
            placeholder="DC"
            value={data.DC}
            onChange={(event) => {
              if (event.target.value.length < 15) handleChangeData(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Label>DC &nbsp; Date </Label>
          <Input
            type="date"
            name="DCDate"
            placeholder="DCDate"
            value={data.DCDate}
            onChange={(event) => {
              handleChangeData(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Label> Party's&nbsp;GSTIN &nbsp;Number </Label>
          <Input
            type="text"
            name="GSTINNumber"
            placeholder="GSTIN Number"
            value={data.GSTINNumber}
            onChange={(event) => {
              if (event.target.value.length < 20) handleChangeData(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Label>Vendor&nbsp;code </Label>
          <Input
            type="text"
            name="vendorCode"
            placeholder="Vendor code"
            value={data.vendorCode}
            onChange={(event) => {
              if (event.target.value.length < 20) handleChangeData(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Label>Po&nbsp;No. </Label>
          <Input
            type="text"
            name="PONo"
            placeholder="Po number"
            value={data.PONo}
            onChange={(event) => {
              if (event.target.value.length < 15) handleChangeData(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Label>Po date </Label>
          <Input
            type="date"
            name="PODate"
            placeholder="Po date"
            value={data.PODate}
            onChange={(event) => {
              handleChangeData(event);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
