import express from "express";
import generateInvoice from "./controllers/generateInvoice.js";
import viewInvoice from "./controllers/viewInvoice.js";
import cors  from 'cors';

let app = express();
app.use(express.json());
app.use(cors())
app.post("/generate", generateInvoice);

app.post("/view", viewInvoice);

app.listen(8080, function () {
  console.log("Example app listening on port 3000!");
});
