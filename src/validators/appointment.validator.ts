import Joi from "joi";
import { AppointmentStatus } from "@prisma/client";

export const appointmentSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(AppointmentStatus))
    .required(),
  date: Joi.date().required(),
});
