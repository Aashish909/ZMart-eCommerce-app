import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import path from "path";

//config env
dotenv.config();

//database comfig
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //for parsing json data in request body
app.use(morgan("dev"));
app.use(express.static.apply(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
