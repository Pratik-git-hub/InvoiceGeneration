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

<<<<<<< HEAD
app.listen(8000, function () {
  console.log("Example app listening on port 3000!");
=======
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
>>>>>>> d1012638a2bb02e214e443d972ff7a7a18055016
});
