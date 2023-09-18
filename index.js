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
const {notification}=require("./Router/Notification")
const dailyReportModel  = require('./model/daily_reports');
const CouponModel = require("./model/coupon");
const VendorSettlement = require("./model/Settlement");
const fs = require('fs');
const { Parser } = require('json2csv');
const cloudinary = require("./Router/cloudinary");
const { v2: cloudinaryV2 } = require('cloudinary');
const app = express();
app.use(cors());
app.use(express.json());


const task = async () => {
  try {
    const data = await CouponModel.find();
    const setle = await VendorSettlement.find();

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
    
   
    const totalpending =setle.filter(( e) => {
      // console.log(e.generate.generateDate)
      return e.sendor.Date==getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="pending" && e.receiver.status==="pending"
    });
   
    const totalaprovebyadminArr=setle.filter(( e) => {
      // console.log(e.generate.generateDate)
      return (e.sendor.Date==getCurrentDateFormatted() && e.sendor.status === "pending" && e.superAdmin.status=="returning" && e.receiver.status==="accepted") ||
      (e.sendor.status === "pending" && e.superAdmin.status=="accepted" && e.receiver.status==="pending") ||
      (e.sendor.status === "pending" && e.superAdmin.status=="pending" && e.receiver.status==="accepted")
   

    });
console.log("arr",totalaprovebyadminArr)
  
const totalAmountGive = [];
const totalAmountTake = [];

const senddata = totalpending.map((e) => {
  totalAmountGive.push(e.sendor.vendorName);

  
});
const takedata=totalaprovebyadminArr.map((e) => {

  
  totalAmountTake.push(e.receiver.vendorName);
  
});

totalAmountGive.push(totalAmountGive.length.toString())
totalAmountTake.push(totalAmountTake.length.toString())
console.log(totalAmountGive,totalAmountTake)
 


    const dailyReport = await dailyReportModel({
      total_couponGenerate,
      total_couponRedeem,
      totalSendRequest,
      totalAproveByAdmin,
      totalForwardByAdmin,
      totalAmountGive:totalAmountGive,
      totalAmountTake:totalAmountTake,
      createdAt: getCurrentDateFormatted(),
      time: getCurrentTime(),
      
    });
    const result = await dailyReport.save();
 console.log(result)
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const publicId = `reports/report_${formattedDate}_${Date.now()}.csv`;
    // const csvdata = await dailyReportModel.find({createdAt: getCurrentDateFormatted()}, {
    //   total_couponGenerate: 1,
    //   total_couponRedeem: 1,
    //   totalSendRequest: 1,
    //   totalAproveByAdmin: 1,
    //   totalForwardByAdmin: 1,
    //   totalAmountGive:1,
    //   totalAmountTake: 1,
    //   createdAt: 1,
    //   time: 1,
    //   _id: 0 // Exclude the _id field
    // }).lean().exec();

  //  const json2csv = new Parser();
  //   const csvData = json2csv.parse(csvdata);
  //  const csvBuffer = Buffer.from(csvData, 'utf-8');

  const csvdata = await dailyReportModel.find({ createdAt: getCurrentDateFormatted() }).lean().exec();

// Create an array to hold the final CSV data
const csvRows = [];

csvdata.forEach((row) => {
  const totalAmountGiveArray = Array.isArray(row.totalAmountGive)
    ? row.totalAmountGive
    : [row.totalAmountGive];

    const totalAmountTakeArray = Array.isArray(row.totalAmountTake)
    ? row.totalAmountTake
    : [row.totalAmountTake];

    const maxLength = Math.max(totalAmountGiveArray.length, totalAmountTakeArray.length);

  // totalAmountGiveArray.forEach((value, index) => {
  //   const csvRow = {
  //     totalForwardByAdmin: index === 0 ? row.totalForwardByAdmin : '', // Display only once for the first element
  //     totalAmountGive: value,
  //     totalAmountTake: index === 0 ? row.totalAmountTake : '', // Display only once for the first element
  //     createdAt: index === 0 ? row.createdAt : '', // Display only once for the first element
  //     time: index === 0 ? row.time : '', // Display only once for the first element
  //   };

  //   if (index === 0) {
  //     csvRow.total_couponGenerate = row.total_couponGenerate;
  //     csvRow.total_couponRedeem = row.total_couponRedeem;
  //     csvRow.totalSendRequest = row.totalSendRequest;
  //     csvRow.totalAproveByAdmin = row.totalAproveByAdmin;
  //   }

  //   csvRows.push(csvRow);
  // });
  for (let index = 0; index < maxLength; index++) {
    const csvRow = {
      totalForwardByAdmin: index === 0 ? row.totalForwardByAdmin : '', // Display only once for the first element
      totalAmountGive: totalAmountGiveArray[index] || '', // Use the value if it exists, otherwise ''
      totalAmountTake: totalAmountTakeArray[index] || '', // Use the value if it exists, otherwise ''
      createdAt: index === 0 ? row.createdAt : '', // Display only once for the first element
      time: index === 0 ? row.time : '', // Display only once for the first element
    };

    if (index === 0) {
      csvRow.total_couponGenerate = row.total_couponGenerate;
      csvRow.total_couponRedeem = row.total_couponRedeem;
      csvRow.totalSendRequest = row.totalSendRequest;
      csvRow.totalAproveByAdmin = row.totalAproveByAdmin;
    }

    csvRows.push(csvRow);
  }
});



const json2csv = new Parser();
const csvData = json2csv.parse(csvRows);
const csvBuffer = Buffer.from(csvData, 'utf-8');

// The rest of your code to upload and save the CSV remains the same...


  

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinaryV2.uploader.upload_stream(
        {
          public_id: `reports/report_${formattedDate}.csv`,
          publicId,
          resource_type: 'raw',
          folder: 'reports' // Store in a specific folder on Cloudinary
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      // Write the CSV buffer to the upload stream
      uploadStream.write(csvBuffer);
      uploadStream.end();
    });

    console.log('CSV file uploaded to Cloudinary:', uploadResult);

    const isAdmin = await dailyReportModel.findOneAndUpdate(
      { createdAt:getCurrentDateFormatted() },
       {  csvfileurl: uploadResult.secure_url },
     { new: true }
     );

    await isAdmin.save();
    console.log('Daily report created at', isAdmin);

  } catch (error) {
    console.log(error);
  
  }
};

cron.schedule('25 12 * * *', task);



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
app.use("/notification",notification)
// app.listen(4000, async () => {
//   console.log("port is listing 4000");
//   await connection;
// });

const port = process.env.PORT || 4200;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
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