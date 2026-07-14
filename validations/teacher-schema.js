import Joi from "joi";
const teacherSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }),
  name: Joi.string().min(3).max(40).required(),
  surname: Joi.string().min(3).max(40).required(),
  age: Joi.string().alphanum().required(),
  gender: Joi.string().required(),
  nationality: Joi.string().min(3).max(50).required(),
  phone: Joi.string().alphanum().min(7).max(8).required(),
});
export default teacherSchema;
