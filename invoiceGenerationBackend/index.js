import express from "express";
import generateInvoice from "./controllers/generateInvoice.js";
import viewInvoice from "./controllers/viewInvoice.js";
import cors  from 'cors';

let app = express();
let port = 8000;
app.use(express.json());
app.use(cors())
app.post("/generate", generateInvoice);

app.post("/view", viewInvoice);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
