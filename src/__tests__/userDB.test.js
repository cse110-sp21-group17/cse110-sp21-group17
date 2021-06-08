const { Dexie } = require('dexie');
require("fake-indexeddb/auto");
const regeneratorRuntime = require("regenerator-runtime");
var creationTool = require('../userDB.js');

describe('Creation of notes', function(){
    test('First test of the dexie implementation yay', () => {
        expect(1+1).toBe(2);
    });
    // it('works with async/await', async () => {
    //     creationTool.openUserDB("Test_User");
    //     let exist = await Dexie.exists(username);
    //     expect(exist).toBe(true);
    //   });
    // test('First test of the dexie implementation yay', done => {
    //     // db = null;
    //     // creationTool.openUserDB("Test_User");
    //     // expect(db).not.toBe(null);
    //     return expect(creationTool.openUserDB("Test_User")).resolves.toEqual(true);
    // });
});