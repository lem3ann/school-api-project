import Joi from "joi";
const teacherSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }),
  name: Joi.string().min(3).max(40).required(),
  surname: Joi.string().min(3).max(40).required(),
  age: Joi.string().number().required(),
  gender: Joi.string().required(),
  nationality: Joi.string().min(3).max(50).required(),
  phone: Joi.string().number().min(7).required(),
  classId: Joi.string().guid({ version: "uuidv4" }),
});
export default teacherSchema;
