const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("DB Connection error", error));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// middleware routes
app.use("/api", authRoutes);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
