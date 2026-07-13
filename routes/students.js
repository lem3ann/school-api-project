import express from "express";
import { admins } from "../database/admins";
const router = express.Router();
router.use(express.json());
router.post("/students/create", (req, res) => {
  const {
    id,
    name,
    surname,
    age,
    gender,
    nationality,
    relativePhone,
    classId,
    teacherId,
    adminId,
  } = req.body;
  const newStudent = {
    id: uuidv4(),
    name: name,
    suraname: surname,
    age: age,
    gender: gender,
    nationality: nationality,
    relativePhone: relativePhone,
  };
  const properAdmin = admins.forEach((a) => a.adminId === adminId);
  return res.send(properAdmin);
});

// const studentSchema = Joi.object({
//   id: Joi.string().guid({ version: "uuidv4" }),
//   name: Joi.string().min(3).max(40).required(),
//   surname: Joi.string().min(3).max(40).required(),
//   age: Joi.string().number().required(),
//   gender: Joi.string().required(),
//   nationality: Joi.string().min(3).max(50).required(),
//   relativePhone: Joi.string().number().min(7).required(),
//   classId: Joi.string().guid({ version: "uuidv4" }),
//   teacherId: Joi.string().guid({ version: "uuidv4" }),
export default router;
