import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, '.././allure-results/test-log.txt');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

export function writeLog(message: string) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`, 'utf8');
}