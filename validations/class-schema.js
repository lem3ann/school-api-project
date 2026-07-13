import Joi from "joi";
const classSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }),
  name: Joi.string().alphanum().min(2).max(40).required(),
});
export default classSchema;
