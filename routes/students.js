import express, { Router } from "express";
import { admins } from "../database/admins.js";
import studentSchema from "../validations/student-schema.js";
import { dbStudents } from "../database/db-students.js";
import { dbClass } from "../database/db-class.js";
import { dbTeachers } from "../database/db-teachers.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
router.use(express.json());
// ======================================================   CREATE STUDENT ============================================================
router.post("/students/create", (req, res) => {
  try {
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
    const result = studentSchema.validate(req.body);
    const properAdmin = admins.find((a) => a.adminId === adminId);
    const properClass = dbClass.find((c) => c.id === classId);
    const properTeacher = dbTeachers.find((t) => t.id === teacherId);
    if (properAdmin && properClass && properTeacher) {
      if (result.error) {
        return res.status(400).send(result.error.details[0].message);
      } else {
        const newStudent = {
          id: uuidv4(),
          name: name,
          surname: surname,
          age: age,
          gender: gender,
          nationality: nationality,
          relativePhone: relativePhone,
          classId: classId,
          teacherId: teacherId,
        };
        dbStudents.push(newStudent);
        res.status(201).send(dbStudents);
      }
    } else {
      res.status(401).send("Unauthorized ... ");
    }
  } catch (error) {
    console.log(error);
  }
});
// =============================================   GET ALL STUDENTS ===========================================================
router.get("getAll/students/", (req, res) => {
  return res.status(200).send(dbStudents);
});
// ============================================ GET A SPECIFIC STUDENTS =======================================================
router.get("/all/students/:studentId", (req, res) => {
  const { studentId } = req.body;
  const currentStudent = dbStudents.find((s) => s.id === studentId);
  if (currentStudent) {
    return res.status(200).send(currentStudent);
  } else {
    return res.status(404).send("Not found");
  }
});
// =============================================  DELETE STUDENTS =============================================================
router.delete("/");
export default router;
