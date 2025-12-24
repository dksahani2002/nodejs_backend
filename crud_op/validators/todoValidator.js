import Joi from 'joi';
export const createTodosSchema=Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().allow("").max(255).required(),
    completed:Joi.boolean().optional()
});
export const updateTodosSchema=Joi.object({
    title:Joi.string().min(3).max(30).optional(),
    description:Joi.string().allow("").max(255).optional(),
    completed:Joi.boolean().optional()
}).min(1);