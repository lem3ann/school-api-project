import Joi from "joi";
const studentSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }),
  name: Joi.string().min(3).max(40).required(),
  surname: Joi.string().min(3).max(40).required(),
  age: Joi.string().alphanum().required(),
  gender: Joi.string().required(),
  nationality: Joi.string().min(3).max(50).required(),
  relativePhone: Joi.string().alphanum().min(7).required(),
  classId: Joi.string().guid({ version: "uuidv4" }),
  teacherId: Joi.string().guid({ version: "uuidv4" }),
});
export default studentSchema;
