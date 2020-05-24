import checkDirectory from '../check-directory';
import * as path from 'path';
import * as fs from 'fs';

afterAll(() => {
    fs.rmdirSync(path.join(__dirname, '/testDirectory'));
});

describe('Check directory function', () => {
    describe('When directory does not exist', () => {
        it('Should create new directory', (done) => {
            checkDirectory(path.join(__dirname, '/testDirectory'))
            .then(() => {
                expect(fs.accessSync(path.join(__dirname, '/testDirectory'))).toBeUndefined();
                done();
            });
        });
    });

    describe('When directory already exists', () => {
        it('Should resolve the promise', async (done) => {
            expect(checkDirectory(path.join(__dirname, '/testDirectory'))).resolves.toBeUndefined();
            done();
        });
    });
});