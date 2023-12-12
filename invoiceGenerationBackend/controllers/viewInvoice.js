import htmlFormat from "../resources/htmlFormat.js";

const viewInvoice = function (req, res) {
  try {
    let h = htmlFormat(req.body.data, req.body.rows);
    res.json({ html: h , status: "success"});
  } catch (error) {
    console.log("error :  ", error);
    res.status(500).json({status: "fail"})
  }
};

export default viewInvoice;
