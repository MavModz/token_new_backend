const express = require("express");
const { personalInfoModel } = require("../model/user_Model.js");
const personal_Info_Router = express.Router();

personal_Info_Router.post("/add/personal_info", async (req, res) => {
    const {name,email,address,gender,DOB,mobile} = req.body;
    try {
        const info = new personalInfoModel ({name,email,address,gender,DOB,mobile});
        const details = await info.save();
        res.send(details);
    } catch (error) {
        res.send(error);
    }
});



  module.exports = { personal_Info_Router };