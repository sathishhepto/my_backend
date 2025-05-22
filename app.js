const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use('/api/', userRoutes);
const { sendMail } = require("./helper/sendMail");
app.post("/api/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
  
    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Missing required fields: to, subject, or text" });
    }
  
    await sendMail(to, subject, text, res);
  });
  // cookie concept


  app.get('/cookie', (req, res) => {
    const  email  = "mcs@gmail.com";
  
    const token =  email ;
  
    res.cookie('token', token, {
      httpOnly: true, 
      secure: 'production', 
      maxAge: 3600000, 
    });
  
    res.status(200).json({ message: 'cookie set in successfully' });
  });
  
  // // Example protected route
  app.get('/get/cookie', (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
 
      res.status(200).json({ message: 'Token', user:token  });
 
  });
  app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully.' });
  });
sequelize.sync().then(() => {
    const PORT =  process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
