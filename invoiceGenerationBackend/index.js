import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import generateInvoice from "./controllers/generateInvoice.js";
import viewInvoice from "./controllers/viewInvoice.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let app = express();
app.use(express.json());

app.post("/generate", generateInvoice);

app.post("/view", viewInvoice);

app.listen(3001, function () {
  console.log("Example app listening on port 3000!");
});
