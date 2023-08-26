const express = require("express");
const paymentSetlement = express.Router();
const PaymentSettlement = require("../model/paymentSettle");

// GET route to fetch all payment settlements
paymentSetlement.get("/payment-settlements", async (req, res) => {
  try {
    const settlements = await PaymentSettlement.find();
    res.json(settlements);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports =  paymentSetlement;
