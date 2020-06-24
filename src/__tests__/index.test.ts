import Logger from '../index';
import * as fs from 'fs';
import * as path from 'path';

afterAll(() => {
    fs.rmdirSync(path.join(__dirname, '/testDirectory2'), { recursive: true });
});

describe('Logger class', () => {
    const logger: Logger = new Logger({ path: path.join(__dirname, '/testDirectory'), filename: 'test.log' });

    describe('Get path method', () => {
        it('Should return correct path', (done) => {
            expect(logger.getPath()).toEqual(path.join(__dirname, '/testDirectory'));
            done();
        });
    });

    describe('Get filename method', () => {
        it('Should return correct filename', (done) => {
            expect(logger.getFilename()).toEqual('test.log');
            done();
        });
    });

    describe('Set path method', () => {
        it('Should set path successfully', (done) => {
            logger.setPath(path.join(__dirname, '/testDirectory2'));

            expect(logger.getPath()).toEqual(path.join(__dirname, '/testDirectory2'));
            done();
        });
    });

    describe('Set filename method', () => {
        it('Should set filename successfully', (done) => {
            logger.setFilename('test2.log');

            expect(logger.getFilename()).toEqual('test2.log');
            done();
        });
    });

    describe('Log method', () => {
        it('Should append log to file successfully', async(done) => {
            const data: { message: string } = { message: 'Hello world!' };
            await logger.log(data);

            const fileData: string = fs.readFileSync(path.join(__dirname, '/testDirectory2', '/test2.log'), 'utf8');
            const logs = fileData.split(',,');
            logs.pop();

            expect(JSON.parse(logs[0])).toMatchObject(data);
            done();
        });
    });

    describe('Find logs method', () => {
        it('Should filter and return logs successfully', async(done) => {
            const logs: object[] = await logger.findLogs({ message: 'Hello world!' });

            expect(logs[0]).toMatchObject({ message: 'Hello world!' });
            done();
        });
    });

    describe('Remove logs method', () => {
        it('Should successfully remove logs from the file', async (done) => {
            await logger.removeLogs();
            const logs: object[] = await logger.findLogs({});

            expect(logs).toHaveLength(0);
            done();
        });
    });
});