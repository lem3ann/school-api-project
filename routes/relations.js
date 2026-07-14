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
// =============================================  COPY DATA   =====================================================================
const classContainer = [...dbClass];
const studentsContainer = [...dbStudents];
const teachersContainer = [...dbTeachers];
// ==========================================   GET teacher`s students  ===========================================================
router.get("/teachers/:teacherId/students", (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacherIdResult = dbTeachers.find((f) => f.id === teacherId);
    if (teacherIdResult) {
      console.log(filteredStudent);
      const filteredStudent = studentsContainer.filter(
        (s) => s.teacherId === teacherId,
      );
      return res.send(filteredStudent);
    } else {
      res.status(404).send("Not found ...");
    }
  } catch (err) {
    console.log(err);
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

//   let userIncomeData = userCopy.map((user) => {
//     user.relatedIncome = incomes.filter((income) => user.id === income.userId);
//     return user;
//   });
router.get("/students/:studentId/teachers", (req, res) => {});
export default router;
