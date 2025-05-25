# 🛠️ Environment Setup and Server Monitoring

## 📄 Create `.env` File

Create a `.env` file in the root of your project and add the following:

```env
APP_PORT=3000  # Replace with your desired port number

📡 Server Monitoring with monitor.js

monitor.js monitors the server's CPU usage in real-time and restarts the server if usage exceeds 70%.

✅ Step 1: Install PM2

npm install -g pm2

🚀 Step 2: Start Your Server with PM2

pm2 start server.js --name server

📈 Step 3: Run monitor.js

node monitor.js

🛡 Optional: Monitor monitor.js with PM2

pm2 start monitor.js --name monitor
