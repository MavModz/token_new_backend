const express = require("express");
const Admin = require("../model/Admin_Model");
const admin = express.Router();
const { userModel } = require("../model/user_Model.js");
const productModel = require("../model/product");
const jwt = require("jsonwebtoken");
const { sendNotification } = require("./firebase");
const VendorSettlement = require("../model/Settlement");

const cloudinary = require("./cloudinary");
const {
  Adminauth,
  AdminAithentication,
  loginAuth,
} = require("../midleware/auth");

const { adminAuth } = require("../midleware/adminAuth");
const { paymentModel } = require("../model/Payment");
const CouponModel = require("../model/coupon");
const coponCode = require("coupon-code");

admin.post("/login/:mobile", async (req, res) => {
  const { mobile } = req.params;
  const isAdmin = await Admin.findOne({ phoneNumber: mobile });
  console.log(isAdmin, "this is admin");
  if (!isAdmin) {
    return res.status(404).json({ message: "User not found" });
  }

  const { _id } = isAdmin;

  var token = jwt.sign({ userId: _id }, "shhhh");

  if (isAdmin.role === "admin") {
    token += "1";
    return res.status(200).json({ message: "login succesfully", token });
  }

  if (isAdmin.role === "vendor") {
    token = token + "2";

    return res.status(200).json({ message: "login succesfully", token });
  }
});

admin.post("/add", loginAuth, async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      companyName,
      companyOwner,
      companyLogo,
      address,
      presentageValue,
      thresholdvalue,
      id_proof,
      vendorId,
    } = req.body;

    console.log(req.body);

    const isAdmin = await Admin.findOne({ phoneNumber });
    const isUser = await userModel.findOne({ phoneNumber });

    if (isAdmin || isUser) {
      res
        .status(409)
        .json({ message: "Already present contact customer care" });
    }
    var adminData;
    if (id_proof && companyLogo) {
      const uploadedIDproof = await cloudinary.uploader.upload(id_proof, {
        upload_preset: "ridedost",
      });

      const uploadedLogo = await cloudinary.uploader.upload(companyLogo, {
        upload_preset: "ridedost",
        folder: "ridedost",
      });

      if (uploadedIDproof && uploadedLogo) {
        adminData = new Admin({
          name,
          email,
          phoneNumber,
          companyName,
          companyOwner,
          address,
          presentageValue,
          thresholdvalue,
          id_proof: uploadedIDproof,
          companyLogo: uploadedLogo,
          vendorId,
        });

        const response = await adminData.save();
        console.log("this is created admin ID", adminData._id);
      }
    }

    // const { vendorId } = adminData;

    const isVendor = await Admin.findOne({ _id: vendorId });

    console.log("vendor", isVendor);

    if (isVendor.role == "vendor") {
      const superAdmin = await Admin.findOne({ role: "admin" });
      const { _id } = superAdmin;
      const superAdminID = _id.toString();
      sendNotification(
        "success",
        superAdminID,
        "new Vendor Added",
        "Please Approve new vendor added"
      );
    }

    res.status(201).json({ message: "succesfully created" });
    console.log("successful created");
  } catch (err) {
    console.log("error", err);
    return res.status(500).json(err);
  }
});

admin.patch("/update/:id", Adminauth, async (req, res) => {
  const payload = req.body;

  const _id = req.params.id;
  const updateData = await Admin.findByIdAndUpdate({ _id }, { ...payload });

  if (!updateData) {
    return res.status(400).json({ message: "something went wrong" });
  }

  await updateData.save();
  return res.status(200).json({ message: "successFully update data" });
});

admin.get("/vendor", AdminAithentication, async (req, res) => {
  const vendors = await Admin.find();
  if (vendors.length == 0) {
    return res.status(404).json({ message: "data not found" });
  }

  res.status(200).json({ message: "succesfully get the data", vendors });
});

admin.patch("/approval/:id", AdminAithentication, async (req, res) => {
  const { id } = req.params;
  console.log("thi sis id", id);
  const isAdmin = await Admin.findOneAndUpdate(
    { _id: id },
    { status: "completed" }
  );

  if (!isAdmin) {
    return res.status(404).json({ message: "vendor not found" });
  }

  console.log("this is apporval routes", isAdmin);
  const { vendorId } = isAdmin;

  const isSuperAdmin = await Admin.find({ _id: vendorId });

  if (isSuperAdmin.role !== "admin") {
    sendNotification(
      "success",
      vendorId,
      "approved Vendor by Admin",
      `${isAdmin.phoneNumber} Vendor aproved by Admin`
    );
  }

  return res.status(200).json({ message: "succesfully Aproved by admin" });
});

admin.patch("/reject/:id", AdminAithentication, async (req, res) => {
  const { id } = req.params;

  const isAdmin = await Admin.findOneAndUpdate(
    { _id: id },
    { status: "Reject" }
  );
  if (!isAdmin) {
    return res.status(404).json({ message: "vendor not found" });
  }
  const { vendorId } = isAdmin;
  const isSuperAdmin = await Admin.find({ _id: vendorId });

  if (isSuperAdmin.role !== "admin") {
    sendNotification(
      "danger",
      vendorId,
      "Rejected Vendor by Admin",
      `${isAdmin.phoneNumber} Vendor Rejected by Admin`
    );
  }

  return res.status(200).json({ message: "succesfully reject  " });
});

admin.delete("/vendor/:id", AdminAithentication, async (req, res) => {
  const { id } = req.params;
  const isAdmin = await Admin.findOneAndDelete({ _id: id });

  if (!isAdmin) {
    return res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json({ message: "Deleted SuccesFully" });
});

admin.patch("/vendor/update/:id", AdminAithentication, async (req, res) => {
  const id = req.params;
  const data = req.body;
  const updatedData = await Admin.findOneAndUpdate({ _id: id }, data);
  if (!updatedData) {
    return res.status(404).json({ message: "User not Found" });
  }
  return res.status(200).json({ message: "succesFully update" });
});

admin.get("/recieved/request", AdminAithentication, async (req, res) => {
  const _id = req.body.adminId.toString();

  const allRequest = await VendorSettlement.find({ "superAdmin.adminId": _id });
  console.log(allRequest);

  if (allRequest.length == 0 || !allRequest) {
    return res
      .status(404)
      .json({ message: "no incoming settlement avavilable.." });
  }

  res
    .status(200)
    .json({ message: "here all the pending request..", allRequest });
});

admin.post("/forward/:_id", AdminAithentication, async (req, res) => {
  const { _id } = req.params;

  const forwardRequest = await VendorSettlement.findOne({ _id: _id });

  forwardRequest.sendor.status = "forwarded";
  forwardRequest.reciever.status = "pending";
  forwardRequest.superAdmin.status = "forwarded";

  const isrequested = await VendorSettlement.findByIdAndUpdate(
    { _id },
    { ...forwardRequest }
  );

  if (!isrequested) {
    return res.status(500).json({ message: "something went wrong" });
  }

  res
    .status(200)
    .json({ message: "succesfully forwarding to vendor", forwardRequest });
});

admin.patch("/return/:_id", AdminAithentication, async (req, res) => {
  const { _id } = req.params;

  const data = await VendorSettlement.findOne({ _id });

  data.superAdmin.status = "returning";
  data.sendor.status = "requested";

  const isUpdate = await VendorSettlement.findByIdAndUpdate(
    { _id },
    { ...data }
  );

  console.log(isUpdate);

  if (!isUpdate) {
    return res.status(500).json({ message: "something went wrong..." });
  }

  return res.status(200).json({ message: "return to vendor..." });
});

admin.patch("/personalInfo/update", loginAuth, async (req, res) => {
  const payload = req.body;
  const _id = req.body.vendorId;
  const { profileImage } = req.body;

  if (profileImage) {
    const image = await cloudinary.uploader.upload(profileImage, {
      upload_preset: "ridedost",
    });
    req.body.profileImage = image;
    console.log(req.body);
  }

  //  console.log(req.body)
  const updateData = await Admin.findByIdAndUpdate(
    _id,
    { $set: req.body },
    { new: true }
  );
  // console.log(updateData)
  if (!updateData) {
    return res.status(400).json({ message: "something went wrong" });
  }

  await updateData.save();
  return res.status(200).json({ message: "successFully update data" });
});

//get data of single user
admin.get("/personalInfo", loginAuth, async (req, res) => {
  const _id = req.body.vendorId;
  console.log("id", req.body.vendorId);
  try {
    const vendorInfo = await Admin.find({ _id: _id });
    console.log(_id);
    return res
      .status(200)
      .json({ message: "succesfully get the data", vendorInfo });
  } catch (error) {
    console.error("Error approving update:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

admin.post("/checkout", loginAuth, async (req, res) => {
  console.log(req.body);
  const vendor_id = req.body.vendorId;
  const data = await userModel.find({ mobile: req.body.phoneNumber });
  const thresholdvalue = await Admin.find({ _id: vendor_id });
  try {
    if (data && data.length > 0) { // Check if data is not empty
      console.log(thresholdvalue[0].thresholdvalue);
      if (thresholdvalue && thresholdvalue.length > 0 && thresholdvalue[0].thresholdvalue < req.body.amount) {
        const discount = thresholdvalue[0].thresholdvalue * (thresholdvalue[0].presentageValue / 100);
        req.body.amount = req.body.amount - discount;
        req.body.coupon = coponCode.generate();
        console.log("Discount applied.");
      } else {
        console.log("Threshold condition not met.");
      }
    } else {
      return res.status(400).json({ message: "Mobile number is not registered." }); // 400 Bad Request
    }
    console.log(req.body);
    return res.status(200).json(req.body); // 200 OK
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "An error occurred." }); // 500 Internal Server Error
  }
});
module.exports = admin;
