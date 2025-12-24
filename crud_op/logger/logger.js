import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

function createBaseLogger() {
  const baseOptions = {
    level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
    timestamp: pino.stdTimeFunctions.isoTime,
    base: { pid: process.pid, service: process.env.SERVICE_NAME || 'crud_op' }
  };

  if (isProd) {
    return pino(baseOptions); // JSON output
  }

  return pino({
    ...baseOptions,
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:standard' }
    }
  });
}

export const logger = createBaseLogger();

export function createChildLogger(bindings = {}) {
  return logger.child(bindings);
}