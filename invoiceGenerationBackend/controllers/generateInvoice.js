import createPDF from "../utilities/createpdf.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateInvoice = async (req, res) => {
  console.log("hiii inside generateinvoice");
  let flag = await createPDF(
    req.body.data.InvoiceNo,
    req.body.data,
    req.body.rows
  );

  console.log("flag  : ",flag);
  if (flag) {
    const options = {
      root: path.join(__dirname, "/generatedpdf"),
    };

    const fileName = `${__dirname}/../generatedpdf/${req.body.data.InvoiceNo}.pdf`;

    console.log("file name : ",fileName);
    res.download(fileName, function (err) {
      if (err) {
        console.log("error", err);
      } else {
        console.log("Sent:", fileName);
      }
    });
  } else {
    res.status(500);
  }
};

export default generateInvoice;