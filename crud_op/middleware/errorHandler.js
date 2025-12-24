import { logger } from '../logger/logger.js';

export default function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Server Error';

	const log = req && req.log ? req.log : logger;
	log.error({ err, reqId: req && req.id }, message);

	res.status(statusCode).json({ success: false, error: { message }, requestId: req && req.id });
}
