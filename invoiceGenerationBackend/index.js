import express from "express";
import fs from "fs";
import conversion from "phantom-html-to-pdf";
import wkhtmltopdf from "wkhtmltopdf";
const converter = conversion();
import htmlFormat from "./resources/htmlFormat.js";
import pdf from "pdf-creator-node";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  console.log("dddddddddddddddccd : ", req.body);

  let flag = await createPDF(
    req.body.data.InvoiceNo,
    req.body.data,
    req.body.rows
  );
  if (flag) {
    const options = {
      root: path.join(__dirname , "/generatedpdf"),
    };

    const fileName = `${__dirname}/generatedpdf/${req.body.data.InvoiceNo}.pdf`;
    console.log("hiiiiiiiiiiiiiiiiiiii");
    res
    .download(fileName , function (err) {
      if (err) {
       console.log("error",err);
      } else {
        console.log("Sent:", fileName);
      }
    });
  } else {
    res.json({ status: "fail", res: req.body ,error : "error in creation file"});
  }
});

const createPDF =async (invoiceNo, data, items) => {
  let html = fs.readFileSync(
    path.join(__dirname, "/resources/Invoice_Generation.html"),
    "utf8"
  );
  // console.log("html  : ", html);
  try {
    var options = {
      format: "A4",
      orientation: "portrait",
      border: "5mm",
      height: "297mm",
      width: "210mm",
      //   margin:"200mm",
      header: {
        height: "15mm",
        // contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "15mm",
        contents: {
          
        },
      },
    };

    var users = [
      {
        name: "Shyam",
        age: "26",
      },
      {
        name: "Navjot",
        age: "26",
      },
      {
        name: "Vitthal",
        age: "26",
      },
    ];
    var document = {
      html: htmlFormat(data, items),
      path: `./generatedpdf/${invoiceNo}.pdf`,
      type: "",
      data: { users: users },
    };

    await pdf
      .create(document, options)
      .then((res) => {
        console.log("in creation : ",res);
      })
      .catch((error) => {
        console.error(error);
      });
    return true;
  } catch (error) {
    console.log("error  : ", error);
    return false;
  }
};

app.post("/view", function (req, res) {
  try {
    let h= htmlFormat(req.body.data, req.body.rows)
    // console.log(h);
    res.json({html :h});
  } catch (error) {
    console.log("error :  ", error);
  }
});

app.listen(3001, function () {
  console.log("Example app listening on port 3000!");
});
