const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const { user_Router } = require("./Router/user_data");
const {personal_Info_Router}=require("./Router/personal_info")
const { connection } = require("./db");
const admin = require("./Router/admin");
const paymentRouter = require("./Router/payment_Routes");
const Coupon_validate = require("./Router/CouponValidate");
const Product_Router = require("./Router/Product");
const settleMentRoute = require("./Router/SettlementRoute");
const paymentSetlement = require("./Router/paymentsetllement");
const dailyReport=require("./Router/daily_routes")
const dailyReportModel  = require('./model/daily_reports');
const CouponModel = require("./model/coupon");
const VendorSettlement = require("./model/Settlement");
const app = express();
app.use(cors());
app.use(express.json());



  const task = async () => {
  try {
    const data = await CouponModel.find();
    const setle = await VendorSettlement.find();

    // console.log(setle.length)
    const total_couponGenerate = data.reduce((s, e) => {
      // console.log(e.generate.generateDate)
      if (e.generate.generateDate === getCurrentDateFormatted()) {
        s = s + 1;
        // console.log(s)
      }
      return s;
    }, 0);

    const   total_couponRedeem = data.reduce((r, e) => {
      // console.log(e.generate.generateDate)
      if (e.redeem.useDate === getCurrentDateFormatted()) {
        r = r + 1;
        // console.log(s)
      }
      return r;
    }, 0);

    const totalSendRequest =setle.reduce((sr, e) => {
      // console.log(e.generate.generateDate)
      if (e.sendor.Date==getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="pending" && e.receiver.status==="pending") {
        sr = sr + 1;
        // console.log(s)
      }
      return sr;
    }, 0);

    const totalAproveByAdmin=setle.reduce((aba, e) => {
      // console.log(e.generate.generateDate)
      if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "pending" && e.superAdmin.status=="returning" && e.receiver.status==="accepted" ||
       e.superAdmin.Date === getCurrentDateFormatted() &&
      e.sendor.status === "pending" && e.superAdmin.status=="accepted" && e.receiver.status==="pending") {
        aba = aba + 1;
        // console.log(s)
      }
      return aba;
    }, 0);

    const totalForwardByAdmin=setle.reduce((tba, e) => {
      // console.log(e.generate.generateDate)
      if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="forwarded" && e.receiver.status==="pending" ) {
        tba = tba + 1;
        // console.log(s)
      }
      return tba;
    }, 0);



    // ... Rest of your code ...

    // Create and save the daily report
    const dailyReport = await dailyReportModel({
      total_couponGenerate,
      total_couponRedeem,
      totalSendRequest,
      totalAproveByAdmin,
      totalForwardByAdmin,
      totalAmountGive: 0,
      totalAmountTake: 0,
      createdAt: getCurrentDateFormatted(),
      time: getCurrentTime(),
    });
    const result = await dailyReport.save();

    console.log('Daily report created at', new Date());

    // You can add any additional logic or notifications here if needed

  } catch (error) {
    console.log(error);
    // Handle errors or send notifications here
  }
};

// Start the cron job
cron.schedule('25 13 * * *',task);

app.use("/user", user_Router);
app.use("/admin", admin);

app.use("/personal_info",personal_Info_Router)
app.use("/admin/payment", paymentRouter);
app.use("/admin/validate", Coupon_validate);
app.use("/admin/product", Product_Router);
app.use("/admin/coupons", Coupon_validate);
app.use("/paymentsettlement", paymentSetlement)
app.use("/admin/settle", settleMentRoute);
app.use("/admin/dailyreport", dailyReport);
app.listen(4200, async () => {
  console.log("port is listing 4200");
  await connection;
});


function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function getCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}