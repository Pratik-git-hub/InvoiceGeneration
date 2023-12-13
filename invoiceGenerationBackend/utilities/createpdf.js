import htmlFormat from "../resources/htmlFormat.js";
import pdf from "pdf-creator-node";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createPDF =async (invoiceNo, data, items) => {
   
    console.log("inside createpdf  ");
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
      ];

      let documentPath = path.join(__dirname ,  `..`,`generatedpdf`,`${invoiceNo}.pdf`)

      console.error("documentPath : ",documentPath);

      var document = {
        html: htmlFormat(data, items),
        path: documentPath,
        type: "",
        data: { users: users }, 
      };
  
      await pdf
        .create(document, options)
        .then((res) => {
          console.log("in creation : ",res);
        })
        .catch((error) => {
          console.error("error in create pdf pdf : ",error);
        });
      return true;
    } catch (error) {
      console.log("error createpdf  : ", error);
      return false;
    }
  };

  export default createPDF;