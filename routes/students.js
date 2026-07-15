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
router.delete("/students/deleteStudent/:studentId", (req, res) => {
  try {
    const { studentId } = req.body;
    const currentStudent = dbStudents.find((s) => s.id === studentId);
    if (currentStudent) {
      const indexOfStudent = dbStudents.indexOf(currentStudent);
      (dbStudents, splice(indexOfStudent, 1));
      return res.status(200).send("User deleted  ... ");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send("User not found !");
  }
});
//  ========================================  EDIT STUDENTS =======================================================
router.put("/student/edit/:studentId", (req, res) => {
  try {
    const { studentId } = req.body;
    const { name, surname, age, gender, nationality, relativePhone } = req.body;
    const currentStudent = dbStudents.find((s) => s.id === studentId);
    if (currentStudent) {
      editedStudent.name = name;
      editedStudent.surname = surname;
      editedStudent.age = age;
      editedStudent.gender = gender;
      editedStudent.nationality = nationality;
      editedStudent.phone = relativePhone;
      return res.status(200).send("Student updated");
    } else {
      res.status(404).send("Not found ...");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Bad request ...");
  }
});
export default router;
// const studentSchema = Joi.object({
//   id: Joi.string().guid({ version: "uuidv4" }),
//   name: Joi.string().min(3).max(40).required(),
//   surname: Joi.string().min(3).max(40).required(),
//   age: Joi.string().alphanum().required(),
//   gender: Joi.string().required(),
//   nationality: Joi.string().min(3).max(50).required(),
//   relativePhone: Joi.string().alphanum().min(7).required(),
//   classId: Joi.string().guid({ version: "uuidv4" }).required(),
//   adminId: Joi.string().guid({ version: "uuidv4" }),
//   teacherId: Joi.string().guid({ version: "uuidv4" }).required(),
// });
