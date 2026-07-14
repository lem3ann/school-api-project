import express from "express";
import {
  admins
} from "../database/admins.js";
import teacherSchema from "../validations/teacher-schema.js";
import {
  dbStudents
} from "../database/db-students.js";
import {
  dbClass
} from "../database/db-class.js";
import {
  dbTeachers
} from "../database/db-teachers.js";
const router = express.Router();
router.use(express.json());
// =============================================  COPY DATA   =====================================================================
const classContainer = dbClass;
const studentsContainer = dbStudents;
const teachersContainer = dbTeachers;
// ==========================================   GET teacher`s students  ===========================================================
router.get("/teachers/:teacherId/students", (req, res) => {
  try {
    const {
      teacherId
    } = req.params;
    const teacherIdResult = teachersContainer.find((f) => f.id === teacherId);
    if (teacherIdResult) {
      const filteredStudent = studentsContainer.filter(
        (s) => s.teacherId == teacherId,
      );
      teacherIdResult.ofStudents = filteredStudent;
      return res.send(teacherIdResult);
    } else {
      return res.status(404).send("Not found ...");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// --  structure --> student
// [
//     {
//         "id": "0f2170cb-07c0-4930-b995-12f0e956a0f0",
//         "name": "name",
//         "surname": "Lmmmma",
//         "age": "age",
//         "gender": "gender",
//         "nationality": "nationality",
//         "relativePhone": "relativePhone",
//         "classId": "afc43256-bf48-4d20-9db6-ca3c7615c4c6",
//         "teacherId": "0366346b-8995-47da-a80f-62cacdf5d5d8"
//     }
// ]

//  --structure -- > teacher
// [
//     {
//         "id": "0366346b-8995-47da-a80f-62cacdf5d5d8",
//         "name": "Laman",
//         "surname": "Latifova",
//         "age": "age",
//         "gender": "gender",
//         "nationality": "nationality",
//         "phone": "28568127"
//     }
// ]

router.get("/students/:studentId/teachers", (req, res) => {
  try {
    const {
      studentId
    } = req.params;
    const studentIdResult = studentsContainer.find((f) => f.id === studentId);
    if (studentIdResult) {
      const filteredStudent = teachersContainer.filter(
        (s) => s.id == studentId,
      );
      teacherIdResult.ofStudents = filteredStudent;
      return res.send(teacherIdResult);
    } else {
      return res.status(404).send("Not found ...");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});
export default router;