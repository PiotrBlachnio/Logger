import validate from '../validate';

describe('Validate function', () => {
    describe('Path validation', () => {
        describe('When path is not a string', () => {
            it('Should throw an error', (done) => {
                try {
                    validate({ path: 123 });
                } catch(error) {
                    expect(error.message).toEqual('Path must be a string!');
                    done();
                };
            }); 
        });

        describe('When path is string with only spaces', () => {
            it('Should throw an error', (done) => {
                try {
                    validate({ path: '    ' });
                } catch(error) {
                    expect(error.message).toEqual('Path must be specified!');
                    done();
                };
            }); 
        });

        describe('When path is correct', () => {
            it('Should not throw any error', (done) => {
                let error: Error;

                try {
                    validate({ path: './test' });
                } catch(err) {
                    error = err;
                } finally {
                    expect(error).toBeUndefined();
                    done();
                };
            }); 
        });
    });

    describe('Filename validation', () => {
        describe('When filename is not a string', () => {
            it('Should throw an error', (done) => {
                try {
                    validate({ filename: 123 });
                } catch(error) {
                    expect(error.message).toEqual('Filename must be a string!');
                    done();
                };
            }); 
        });

        describe('When filename is string with only spaces', () => {
            it('Should throw an error', (done) => {
                try {
                    validate({ filename: '    ' });
                } catch(error) {
                    expect(error.message).toEqual('Filename must be specified!');
                    done();
                };
            }); 
        });

        describe('When filename is correct', () => {
            it('Should not throw any error', (done) => {
                let error: Error;

                try {
                    validate({ filename: 'test.log' });
                } catch(err) {
                    error = err;
                } finally {
                    expect(error).toBeUndefined();
                    done();
                };
            }); 
        });
    });
});