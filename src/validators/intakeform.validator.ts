import Joi from "joi";

export const intakeformSchema = Joi.object({
  emergencyContactName: Joi.string().required(),
  emergencyContactPhone: Joi.string().required(),
  medicalHistory: Joi.object().optional(),
  currentMedications: Joi.object().optional(),
  allergies: Joi.object().optional(),
});
