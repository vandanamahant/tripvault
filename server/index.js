const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://tripvault-alpha.vercel.app/',
  credentials: true
}));
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "TripVault Backend is running successfully!" });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/users', userRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch((err) => console.error("❌ Database Error:", err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});