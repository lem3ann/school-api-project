import express from "express";
import { dbClass } from "../database/db-class.js";
import { v4 as uuidv4 } from "uuid";
import classSchema from "../validations/class-schema.js";
const router = express.Router();
router.use(express.json());
// ==================================== CREATE NEW STUDENT =============================================
router.post("/students/add/newClass", (req, res) => {
  const { id, name } = req.body;
  try {
    const result = classSchema.validate(req.body);
    if (!result.error) {
      const newClass = {
        id: uuidv4(),
        name: name,
      };
      dbClass.push(newClass);
      res.status(201).send(dbClass);
    } else {
      return res.status(400).send(result.error.details[0].message);
    }
  } catch (e) {
    console.log(e);
  }
});
// ================================== GET ALL STUDENTS LIST ============================================
router.get("/all/class", (req, res) => {
  if (dbClass) {
    res.send(dbClass);
  }
});
//  ================================ GET A SPECIFIC CLASS ===========================================
router.get("/all/class/:classId", (req, res) => {
  const { classId } = req.params;

  const currentClass = dbClass.find((u) => u.id === classId);
  if (currentClass) {
    return res.status(200).send("Class:" + JSON.stringify(currentClass.name));
  } else {
    return res.status(404).send("NOT FOUND !!!");
  }
});
// =============================== DELETE A SPECIFIC CLASS ===========================================
router.delete("/class/deleteClass/:classId", (req, res) => {
  const { classId } = req.params;
  const currentClass = dbClass.find((u) => u.id === classId);
  if (currentClass) {
    const indexOfClass = dbClass.indexOf(currentClass);
    dbClass.splice(indexOfClass, 1);
    return res.send("Deleted class: " + currentClass.name);
  } else {
    return res.status(404).send("Class not found ...");
  }
});

// ============================ EDIT A SPECIFIC CLASS ===============================================
router.put("/all/class/edit/:classId", (req, res) => {
  const { classId } = req.params;
  const { name } = req.body;
  const currentClass = dbClass.find((u) => u.id === classId);
  if (currentClass) {
    currentClass.name = name;
    return res.status(200).send("Class updated ....");
  } else {
    res.status(404).send("Class not found  ....");
  }
});
export default router;
