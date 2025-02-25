const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.route");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));