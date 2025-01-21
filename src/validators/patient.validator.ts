import Joi from 'joi';
import { Gender } from '@prisma/client';

export const patientSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required(),
    dateOfBirth: Joi.date().required(),
    address: Joi.string().required(),
    medicalHistory: Joi.object().optional()
});
