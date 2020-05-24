import matchObject from '../match-object';

describe('Match object function', () => {
    describe('When objects have the same keys but different values', () => {
        it('Should return false', (done) => {
            expect(matchObject({ msg: 'Hello' }, { msg: 'World' })).toBeFalsy();
            done();
        });
    });

    describe('When objects have the same values but different keys', () => {
        it('Should return false', (done) => {
            expect(matchObject({ hello: 'message' }, { world: 'message' })).toBeFalsy();
            done();
        });
    });

    describe('When objects have the same one of two values and keys', () => {
        it('Should return false', (done) => {
            expect(matchObject({ msg: 'Hello', code: 1 }, { msg: 'Hello', code: 2 })).toBeFalsy();
            done();
        });
    });

    describe('When first object has one in common property with the second', () => {
        it('Should return false', (done) => {
            expect(matchObject({ msg: 'Hello' }, { msg: 'Hello', code: 1 })).toBeFalsy();
            done();
        });
    });

    describe('When objects are the same', () => {
        it('Should return true', (done) => {
            expect(matchObject({ msg: 'Hello' }, { msg: 'Hello' })).toBeTruthy();
            done();
        });
    });

    describe('When the second object is empty', () => {
        it('Should return true', (done) => {
            expect(matchObject({ msg: 'Hello' }, {})).toBeTruthy();
            done();
        });
    });

    describe('When second object has one in common property with the first', () => {
        it('Should return true', (done) => {
            expect(matchObject({ msg: 'Hello', code: 1 }, { msg: 'Hello' })).toBeTruthy();
            done();
        });
    });
});