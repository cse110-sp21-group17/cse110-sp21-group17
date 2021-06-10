import Dexie from 'dexie';
import dexieRelationships from 'dexie-relationships';
const regeneratorRuntime = require("regenerator-runtime");
import { Note, Task, Subtask, Event, Goal, Entry } from '../object_files/objects.js';

var creationTool = require('../userDB.js');

var date1 = new Date(1, 1, 1);
var note1= new Note("This is a test note", date1);
var task1 = new Task("First task", date1, "First Goal", false);
var event1 = new Event("Event 1", date1, false);
var goal1 = new Goal("Goal 1 description", "Goal 1", date1, false);
describe('Creation of units and deletion of db', function(){
    test('First test of the dexie implementation yay', () => {
        expect(1+1).toBe(2);
    });
    // it('works with async/await', async () => {
    //     creationTool.openUserDB("Test_User");
    //     let exist = await Dexie.exists(username);
    //     expect(exist).toBe(true);
    //   });
    test('Can we open a db', () => {
        creationTool.db = null;
        creationTool.openUserDB("Test_User");
        expect(creationTool.db).not.toBe(null);
    //     return expect(creationTool.openUserDB("Test_User")).resolves.toEqual(true);
     });

    
    //
    // Tests goes here...
    //

    test('Tests to see if we can add a note', () => {
      
         
         creationTool.createEntry(note1);
         
         return creationTool.db.notes.count().then(count => {
            expect(count).toBe(1);
          });
      });

      afterAll(async () => {
        //await connection.close();
        await creationTool.db.close();
      });
    
      test('Tests to see if we can add a task', () => {
      
         
        creationTool.createEntry(task1);
        
        return creationTool.db.tasks.count().then(count => {
           expect(count).toBe(1);
         });
     });
     test('Tests to see if we can add a event', () => {
      
         
        creationTool.createEntry(event1);
        
        return creationTool.db.events.count().then(count => {
           expect(count).toBe(1);
         });
     });

     test('Tests to see if we can add a goal', () => {
      
         
        creationTool.createEntry(goal1);
        
        return creationTool.db.goals.count().then(count => {
           expect(count).toBe(1);
         });
     });

     test('Tests to see if we can delete a database', () => {
      
         
        creationTool.deleteUserDB("Test_User");
        
        return Dexie.exists("Test_User").then(exists => {
           expect(exists).toBe(false);
         });
     });

    // it('Tests to see if we can delete a database', () =>{

    //     // Assertions
    //     expect(creationTool.deleteUserDB("Test_User")).resolves.toBe(false);
    // });
    //knex.destroy();
});

