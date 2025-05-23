const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const Admin = require('./Models/Admin');
const bcrypt = require('bcrypt');
const recordRouter = require('./routes/record');
const carRouter = require('./routes/Car');
const payementRouter = require('./routes/payement');
const slotRouter = require('./routes/Slot');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend dev server
  credentials: true,
}));
app.use(express.json()); // to parse JSON bodies

app.use(session({
  secret: 'your-secret-key', // replace with a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

mongoose.connect('mongodb://localhost:27017/PSSMS')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



  

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount >= 3) {
      return res.status(403).json({ message: 'Registration limit reached' });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Registration successful, please login' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    req.session.adminId = admin._id;
    res.json({ user: { email: admin.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

app.use('/api/records', recordRouter);
app.use('/api/cars', carRouter);
app.use('/api/payements', payementRouter);
app.use('/api/slots', slotRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
