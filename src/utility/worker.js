const mongoose = require("mongoose");
const agentModel  = require("../models/agent.model")
const userModel = require("../models/user.model")
const lobModel = require("../models/lob.model")
const accountModel = require("../models/userAccount.model")
const carrierModel = require("../models/carrier.models")
const policyModel = require("../models/policy.model")
const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csv = require('csv-parser');


async function findOrCreate(model, query, data = query) {
  const modelName = model.modelName;
  let doc = await model.findOne(query);
  if (doc) {
    console.log(`[Found] in ${modelName}:`, query);
  } else {
    console.log(`[Creating] in ${modelName}:`, data);
    doc = await model.create(data);
    console.log(`[Created] in ${modelName}:`, doc);
  }
  return doc;
}

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/insurance');
    console.log('✅ MongoDB connected');

    const results = [];

    fs.createReadStream(workerData.filePath)
      .pipe(csv())
      .on('data', (row) => {
        console.log('Parsed row:', row); 
        results.push(row);
      })
      .on('end', () => {
        (async () => {
          try {
            for (const row of results) {
              console.log('Processing row:', row);
              const agent = await findOrCreate(agentModel, { agentName: row['agent'] });
              const user = await findOrCreate(userModel, {
                firstName: row['firstname'],
                dob: row['dob'],
                address: row['address'],
                phoneNumber: row['phone'],
                state: row['state'],
                zipCode: row['zip'],
                email: row['email'],
                gender: row['gender'],
                userType: row['userType']
              });
              await findOrCreate(accountModel, { accountName: row['account_name'],userId: user._id});
              const lob = await findOrCreate(lobModel, { categoryName: row['category_name'] });
              const carrier = await findOrCreate(carrierModel, { companyName: row['company_name'] });
    
              await findOrCreate(policyModel, {
                policyNumber: row['policy_number'],
                startDate: row['policy_start_date'],
                endDate: row['policy_end_date'],
                categoryId: lob._id,
                companyId: carrier._id,
                userId: user._id
              });
              const policyCount = await policyModel.countDocuments();
              console.log(`✅ Upload complete. Total policies in DB: ${policyCount}`);
            }
            parentPort.postMessage('Upload complete');
            process.exit(0);
          } catch (err) {
            console.error('❌ Upload failed:', err);
            parentPort.postMessage('Upload failed: ' + err.message);
            process.exit(1);
          }
        })();
      })
      .on('error', (err) => {
        console.error('❌ CSV Read Error:', err);
      });
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    parentPort.postMessage('MongoDB connection failed: ' + err.message);
    process.exit(1);
  }
})();
