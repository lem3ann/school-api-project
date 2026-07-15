import express from "express";
import { admins } from "../database/admins.js";
import teacherSchema from "../validations/teacher-schema.js";
import { dbStudents } from "../database/db-students.js";
import { dbClass } from "../database/db-class.js";
import { dbTeachers } from "../database/db-teachers.js";
const router = express.Router();
router.use(express.json());
// =============================================  COPY DATA   =====================================================================
const classContainer = dbClass;
const studentsContainer = dbStudents;
const teachersContainer = dbTeachers;
// ==========================================   GET teacher`s students  ===========================================================
router.get("/teachers/:teacherId/students", (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacherIdResult = teachersContainer.find((f) => f.id === teacherId);
    if (teacherIdResult) {
      const filteredStudent = studentsContainer.filter(
        (s) => s.teacherId == teacherId,
      );
      teacherIdResult.totalStudents = filteredStudent;
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
//         "surname": "Laman",
//         "age": "22",
//         "gender": "female",
//         "nationality": "AZE",
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
// [
//     {
//         "id": "ffd70020-8667-49cc-90b8-7775a0852074",
//         "name": "288b"
//     }
// ]
// ===================================================== GET STUDENT`S TEACHER =============================================
router.get("/students/:studentId/teachers", (req, res) => {
  try {
    const { studentId } = req.params;
    const studentIdResult = studentsContainer.find((s) => s.id === studentId);
    const currentStudent = studentIdResult.teacherId;
    if (studentIdResult) {
      const filteredTeacher = teachersContainer.filter(
        (t) => t.id == studentId,
      );
      console.log(studentIdResult);
      studentIdResult.totalTeacher = filteredTeacher;
      return res.send(studentIdResult);
    } else {
      return res.status(404).send("Not found ...");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});
// ============================================== GET CLASS`S STUDENTS ====================================================
router.get("/class/:classId/students", (req, res) => {
  try {
    const { classId } = req.params;
    const classIdResult = classContainer.find((c) => c.id === classId);
    if (classIdResult) {
      const filteredStudent = studentsContainer.filter(
        (s) => s.classId == classId,
      );
      classIdResult.totalStudents = filteredStudent;
      return res.send(classIdResult);
    } else {
      return res.status(404).send("Not found ...");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});
export default router;
