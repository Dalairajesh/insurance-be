const User = require("../models/user.model")
const Policy = require("../models/policy.model")
const Category = require('../models/lob.model');
const Carrier = require('../models/carrier.models');
const { Worker } = require('worker_threads');
const path = require('path');



const uploadCSVFile = async(req, res) => {
    console.log("hello")
    const worker = new Worker(path.join(__dirname, "../utility/worker.js"), {
        workerData: { filePath: req.file.path }
      });

      let responseSent = false;
      const safeSend = (status, message) => {
        if (!responseSent) {
          res.status(status).send(message);
          responseSent = true;
        }
      };
    
      worker.on('message', msg => console.log('Worker:', msg));
      worker.on('error', err => {
        console.error('Worker error:', err);
        safeSend(500, 'Worker error: ' + err.message);
      });
      worker.on('exit', code => {
        if (code === 0) safeSend(200, 'Upload completed successfully');
        else safeSend(500, 'Worker exited with error code ' + code);
      });
   
}


const searchUser = async(req, res) => {
    try {
        const username = req.params.username;

    
        const user = await User.findOne({ firstName: username });
        if (!user) return res.status(404).json({ error: 'User not found' });
    
        const policies = await Policy.find({ userId: user._id })
          .populate('policyCategoryId')
          .populate('companyId');
    
        res.json({ user, policies });
      } catch (err) {
        console.error('Error in search API:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


const aggregatedPloicy = async(req, res) => {
    try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPolicies: { $sum: 1 },
          policyNumbers: { $push: "$policyNumber" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          firstName: "$userInfo.firstName",
          email: "$userInfo.email",
          totalPolicies: 1,
          policyNumbers: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error('Aggregation error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    uploadCSVFile:uploadCSVFile,
    searchUser:searchUser,
    aggregatedPloicy:aggregatedPloicy
}







