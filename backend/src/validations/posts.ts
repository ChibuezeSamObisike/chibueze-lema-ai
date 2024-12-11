import Joi from 'joi';

export const postValidationSchema = Joi.object({
  user_id: Joi.string().required().label('User ID'),
  title: Joi.string().required().min(3).max(255).label('Title'),
  content: Joi.string().required().min(5).label('Content'),
});
