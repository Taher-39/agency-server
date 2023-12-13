const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./Routes/authRoutes");
const serviceRoutes = require("./Routes/serviceRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const feedbackRoutes = require("./Routes/feedbackRoutes");
const userRoutes = require("./Routes/userRoutes");
const emailRoutes = require("./Routes/emailRoutes");

//middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
dbConnect();

// Routes
app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/users", userRoutes);
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("connected");
});

app.listen(port, () => {
  console.log(`App listen at http://localhost:${port}`);
});
