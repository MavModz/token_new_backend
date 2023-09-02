const express = require("express");
const paymentSetlement = express.Router();
const PaymentSettlement = require("../model/paymentSettle");
const { AdminAithentication, loginAuth } = require("../midleware/auth");
const { set } = require("mongoose");
const { adminAuth } = require("../midleware/adminAuth");

// GET route to fetch all payment settlements

// const itemsPerPage = 10;
// paymentSetlement.get("/payment-settlements",loginAuth, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const settlements = await PaymentSettlement.find();

//     const itemsToSend = settlements.slice(startIndex, endIndex);
//     const totalPages = Math.ceil(settlements.length / itemsPerPage);
//    console.log(itemsToSend.length)
//     res.json({
//       items: itemsToSend,
//       currentPage: page,
//       totalPages: totalPages,
//     });

//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });




// GET route to fetch all payment settlements
paymentSetlement.get("/payment-settlements",AdminAithentication,async (req, res) => {
  try {
    const settlements = await PaymentSettlement.find();
    console.log(settlements.length)
    res.json(settlements);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

paymentSetlement.get("/payment-settlements/vendor", loginAuth, async (req, res) => {
  try {
    // Fetch payment settlements where either "requestedBy.vendorId" or "requestedTo.vendorId" is equal to "req.body.vendorId"
    const settlements = await PaymentSettlement.find({
      $or: [
        {"requestedBy.vendorId": req.body.vendorId},
        {"requestedTo.vendorId": req.body.vendorId}
      ]
    });
    console.log(settlements.length)
    res.json(settlements);
  } catch (error) {
    // Handle any errors that may occur during the database query
    res.status(500).json({ error: "Server error" });
  }
});


module.exports =  paymentSetlement;

