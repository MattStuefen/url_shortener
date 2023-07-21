import winston from 'winston';

export const Logger: winston.Logger = winston.createLogger({
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        trace: 4,
        debug: 5
    },
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({format: 'M/D/YYYY H:mm:ss'}),
        winston.format.printf((info) => `[${info.timestamp}] ${info.message ?? ''}`)
    ),
    transports: [new winston.transports.Console()]
});