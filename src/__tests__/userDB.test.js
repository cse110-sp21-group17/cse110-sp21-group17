
const creationTool = require('../userDB');

// describe('Creation of notes', function(){
//     // test('checks to make sure there is not a note named note tester', () => {
//     //     expect(window.localStorage.getItem('noteTester')).toBe(null);
//     // });
// });

describe('Creation of Notes', function() {
    beforeAll(async () => {

    });

    it('Test1: checks to make sure there is not a note named note tester', async () => {
        expect(window.localStorage.getItem('noteTester')).toBe(null);
    });
});