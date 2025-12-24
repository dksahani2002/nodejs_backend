import express from 'express';
import routes from './todo/routes.js';
import errorHandler from './middleware/errorHandler.js';
import { logger } from './logger/logger.js';
import { requestId } from './middleware/requestId.js';
import { httpLogger } from './middleware/loggerMiddleware.js';
const port = 3000;
const app = express();
app.use(express.json());

// attach request id and http logger before routes
app.use(requestId());
app.use(httpLogger());
app.use('/', routes);

// Centralized error handler (after routes)
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});

 