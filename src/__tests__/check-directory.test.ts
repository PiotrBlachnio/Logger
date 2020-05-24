import checkDirectory from '../check-directory';
import * as fs from 'fs';

describe('Check directory function', () => {
    describe('When directory does not exist', () => {
        it('Should create new directory', (done) => {
            checkDirectory('./testDirectory')
            .then(() => {
                expect(fs.accessSync('./testDirectory')).toBeUndefined();
                done();
            });
        });
    });

    describe('When directory already exists', () => {
        it('Should resolve the promise', async (done) => {
            expect(checkDirectory('./testDirectory')).resolves.toBeCalled();
            done();
        });
    });
});