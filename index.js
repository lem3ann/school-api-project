import express from "express";
import router from "./routes/class.js";
import studentRouter from "./routes/students.js";
import teacherRouter from "./routes/teachers.js";
import relationRouter from "./routes/relations.js";
const app = express();
const port = process.env.PORT || 3000;
app.use("/api", router);
app.use("/api", studentRouter);
app.use("/api", teacherRouter);
app.use("/api", relationRouter);
app.listen(port, () => {
  console.log("Server is running  ....");
});
