import Joi from 'joi';

export const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('ADMIN', 'CLIENT').required()
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Add validation schemas
export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).required()
});
