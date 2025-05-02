import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoute);

//PORT
const PORT = process.env.PORT || 8000;
//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on mode ${process.env.DEV_MODE} on port ${PORT}`.bgCyan
      .white
  );
});
