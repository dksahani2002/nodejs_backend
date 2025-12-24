import pinoHttp from 'pino-http';
import { logger } from '../logger/logger.js';

export function httpLogger() {
  return pinoHttp({
    logger,
    genReqId: (req) => req.id,
    customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,
    serializers: {
      req: (req) => ({ method: req.method, url: req.url, id: req.id }),
      res: (res) => ({ statusCode: res.statusCode })
    }
  });
}