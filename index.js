import express from "express";
import router from "./routes/class.js";
import studentRouter from "./routes/students.js";
const app = express();
const port = process.env.PORT || 3000;
app.use("/api", router);
app.use("/api", studentRouter);
app.listen(port, () => {
  console.log("Server is running  ....");
});
