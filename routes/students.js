import express from "express";
import { admins } from "../database/admins.js";
import studentSchema from "../validations/student-schema.js";
import { dbStudents } from "../database/db-students.js";
import { dbClass } from "../database/db-class.js";
import { dbTeachers } from "../database/teachers.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
router.use(express.json());
router.post("/students/create", (req, res) => {
 try{
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
  const result=studentSchema.validate(req.body);
  console.log(result)
if(!result.error){
    return res.status(400).send("Bad request ...");
}else{
  const newStudent = {
    id: uuidv4(),
    name: name,
    suraname: surname,
    age: age,
    gender: gender,
    nationality: nationality,
    relativePhone: relativePhone,
  };
  dbStudents.push(newStudent);
  res.status(201).send(dbStudents);  
}
 }catch(error){
  console.log(error)
 }
});
export default router;
