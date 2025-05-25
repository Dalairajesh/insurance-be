const cron = require('node-cron');
const messageModel = require("../models/message.model")



const dayToCron = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  };


  const message = async(req, res) => {
     
    const { message, day, time } = req.body;

  if (!message || !day || !time) {
    return res.status(400).json({ error: 'Missing message, day, or time' });
  }

  const saved = await messageModel.create({ message, day, time });

  const [hour, minute] = time.split(':');
  const cronExpr = `${minute} ${hour} * * ${dayToCron[day]}`;

  cron.schedule(cronExpr, () => {
    console.log(`📩 Scheduled Message (${day} ${time}):`, message);
    // Here, you could also add logic to send an email, SMS, etc.
  });

  res.json({ success: true, message: 'Scheduled successfully', data: saved });

  }


  module.exports = {
    message:message
  }