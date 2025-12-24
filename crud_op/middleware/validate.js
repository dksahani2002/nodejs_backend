import { ErrorResponse } from "../utils/ErrorResponse.js";
export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const msg = error.details.map((d) => d.message).join(', ');
      return next(new ErrorResponse(msg, 400));
    }
    req.body = value;
    next();
  };
};

export const validateParamId = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(String(id))) {
    return next(new ErrorResponse('Invalid id format', 400));
  }
  next();
};