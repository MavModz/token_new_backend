const express = require("express");
const ntpClient = require('ntp-client');
const dailyReport = express.Router();
const dailyReportModel = require("../model/daily_reports");
const { AdminAithentication, loginAuth } = require("../midleware/auth");
const { set } = require("mongoose");
const CouponModel = require("../model/coupon");
const VendorSettlement = require("../model/Settlement");
const fs = require('fs');
const { Parser } = require('json2csv');
const cloudinary = require("./cloudinary");
// GET route to fetch all payment settlements
const { v2: cloudinaryV2 } = require('cloudinary');

dailyReport.get('/generate-csv', async (req, res) => {
  try {
    const currentDateFormatted = getCurrentDateFormatted();
    
    // Fetch data from the MongoDB collection for the current date
    const data = await dailyReportModel.find({ createdAt: currentDateFormatted }).exec();
    console.log("data", data);

    // Convert the fetched data to CSV format
    const json2csv = new Parser();
    const csvData = json2csv.parse(data);

    // Write the CSV data to a file
    const fileName = `report_${currentDateFormatted}.csv`;
    fs.writeFile(fileName, csvData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing CSV file:', err);
        res.status(500).json({ error: 'Error writing CSV file' });
      } else {
        console.log(`CSV file ${fileName} has been created successfully.`);
        res.status(200).json({ message: 'CSV file created successfully',fileName });
      }
    });
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
});

dailyReport.get('/generate-csvfile', async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];


    // const currentDate = new Date();
    // const formattedDate = currentDate.toISOString().split('T')[0];

    // Generate a unique public ID with a timestamp
    const publicId = `reports/report_${formattedDate}_${Date.now()}.csv`;

    // Fetch data from the MongoDB collection
    // const data = await dailyReportModel.find({createdAt:getCurrentDateFormatted()}).exec();
    const data = await dailyReportModel.find({createdAt: getCurrentDateFormatted()}, {
      total_couponGenerate: 1,
      total_couponRedeem: 1,
      totalSendRequest: 1,
      totalAproveByAdmin: 1,
      totalForwardByAdmin: 1,
      totalAmountGive: 1,
      totalAmountTake: 1,
      createdAt: 1,
      time: 1,
      _id: 0 // Exclude the _id field
    }).lean().exec();

    // Convert the fetched data to CSV format
    const json2csv = new Parser();
    const csvData = json2csv.parse(data);

    // Convert the CSV data to a Buffer
    const csvBuffer = Buffer.from(csvData, 'utf-8');

    // Upload the CSV buffer to Cloudinary using upload_stream
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

    res.status(200).json({ message: 'CSV file uploaded to Cloudinary successfully' , csvUrl: uploadResult.secure_url});
  } catch (error) {
    console.error('Error fetching data from MongoDB or uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
});

dailyReport.post("/dailyReports", async (req, res) => {
  try {
    const data = await CouponModel.find();
    const setle=await VendorSettlement.find()
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



    // const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const dailyReport = await dailyReportModel({
      total_couponGenerate,
      total_couponRedeem,
      totalSendRequest,
      totalAproveByAdmin,
      totalForwardByAdmin,
      totalAmountGive:0,
      totalAmountTake:0,
      createdAt:getCurrentDateFormatted(),
      time: getCurrentTime(),
    });
   const result= await dailyReport.save()
   res.status(201).json({ message: "succesfully created",result, actualDateValue,actualTimeValue });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = dailyReport;

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








