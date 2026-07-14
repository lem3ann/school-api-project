import express from "express";
import { admins } from "../database/admins.js";
import teacherSchema from "../validations/teacher-schema.js";
import { dbStudents } from "../database/db-students.js";
import { dbClass } from "../database/db-class.js";
import { dbTeachers } from "../database/db-teachers.js";
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";
const router = express.Router();
router.use(express.json());
router.use(morgan("combined"));
// =========================================  CREATE NEW TEACHER =======================================================
router.post("/teachers/create", (req, res) => {
  try {
    const result = teacherSchema.validate(req.body);
    const { name, surname, age, gender, nationality, phone } = req.body;
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    } else {
      if (dbTeachers.find((f) => f.phone === phone)) {
        return res.status(400).send("Duplicate number  .... ");
      } else {
        const newTeacher = {
          id: uuidv4(),
          name: name,
          surname: surname,
          age: age,
          gender: gender,
          nationality: nationality,
          phone: phone,
        };
        dbTeachers.push(newTeacher);
        res.status(201).send(dbTeachers);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
// ===================================== GET ALL TEACHER =======================================================
router.get("/all/teachers", (req, res) => {
  res.status(200).send(dbTeachers);
});
// ===================================== GET A SPECIFIC TEACHER ================================================
router.get("/all/teachers/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const specificTeacher = dbTeachers.find((t) => t.id === teacherId);
  if (specificTeacher) {
    return res
      .status(200)
      .send(specificTeacher.name + " " + specificTeacher.surname);
  } else {
    return res.status(401).send("User not found ...");
  }
});
// ================================== DELETE SPECIFIC TEACHER ==================================================
router.delete("/teachers/deleteTeacher/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const deletedTeachers = dbTeachers.find((t) => t.id === teacherId);
  if (deletedTeachers) {
    const indexOfTeachers = dbTeachers.indexOf(deletedTeachers);
    dbTeachers.splice(indexOfTeachers, 1);
    return res.send(
      deletedTeachers.name + " " + deletedTeachers.surname + " is deleted ...",
    );
  } else {
    return res.status(400).send("Teacher not found ...");
  }
});
// ============================================== EDIT USER =====================================================
router.put("/teachers/edit/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const { name, surname, age, gender, nationality, phone } = req.body;
  const editedTeacher = dbTeachers.find((t) => t.id === teacherId);
  if (editedTeacher) {
    editedTeacher.name = name;
    editedTeacher.surname = surname;
    editedTeacher.age = age;
    editedTeacher.gender = gender;
    editedTeacher.nationality = nationality;
    editedTeacher.phone = phone;
    return res.status(200).send("Teacher updated");
  } else {
    return res.status(400).send("Teacher not found ...");
  }
});

export default router;
