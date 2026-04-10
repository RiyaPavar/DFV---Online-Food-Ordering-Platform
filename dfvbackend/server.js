const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

//For creating a master admin user
// This should be run only once to set up the master admin user
// Import User model and bcrypt for password hashing

const User = require('./models/User');
const bcrypt = require('bcryptjs');

const createMasterAdmin = async () => {
  const masterExists = await User.findOne({ role: 'master' });
  if (!masterExists) {
    const hashed = await bcrypt.hash('yourStrongPassword', 10);
    const master = new User({
      name: 'masteradmin',
      email: 'admin@dfv.com',
      password: hashed,
      role: 'master',
      isApprovedAdmin: true
    });
    await master.save();
    console.log("✅ Master admin created");
  }
};

createMasterAdmin();

// Initialize Express app

const app = express();
app.use(cors(
  {origin: 'http://localhost:3000', // ✅ not '*'
  credentials: true}
));
app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use('/offers', require('./routes/offerRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
