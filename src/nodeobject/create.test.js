var creationTool = require('./script');

describe('Creation of notes and tasks', function(){
    test('checks to make sure there is not a note named note tester', () => {
        expect(window.localStorage.getItem('noteTester')).toBe(null);
    });
    test('checks to make sure there is sometime created when we make a note', () => {
        //new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);
        let date = Date(2077, 12, 10, 4, 4, 4, 4);
        let noteJSON = creationTool.createNote("DAY 1 in hell: I have just signed up for another quarter of hurt.", date);
        //let storedNote = window.localStorage.getItem(noteJSON.key);
        let keyArrString = localStorage.getItem(date);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        expect(keyArr[0]).not.toBe(null);
        // expect(keyArr).toBe(["yoshi"]);
        expect(keyArr[0]).toBe(noteJSON.key.toString());
        expect(localStorage.getItem(keyArr[0])).not.toBe(null);
        //window.localStorage.clear();
    });

    test('checks to make a second note is retrievable', () => {
        //new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);
        setTimeout(1000);
        let date = Date(2077, 12, 10, 4, 4, 4, 4);
        let noteJSON = creationTool.createNote("DAY 2 in hell: I have just signed up for another quarter of hurt.", date);
        //let storedNote = window.localStorage.getItem(noteJSON.key);
        let keyArrString = localStorage.getItem(date);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        expect(keyArr[1]).not.toBe(null);
        expect(keyArr[1]).toBe(noteJSON.key.toString());
        expect(localStorage.getItem(keyArr[1])).not.toBe(null);
        //window.localStorage.clear();
    });
    // test('checks to make sure the note holds the content and date properly', () => {
    //     let date = Date(2077, 12, 10, 4, 4, 4, 4);
    //     let keyArrString = localStorage.getItem(date);
    //     expect(keyArrString).not.toBe(null);
    //     let keyArr = Array.from(keyArrString);
    //     let noteString = localStorage.getItem(keyArr[0]);

    //     //fetched the note created in the last test
    //     expect(noteString).not.toBe(null);
    //     var storedNoteJSON = JSON.parse(storedNote);
    //     expect(storedNoteJSON.cnt).toMatch(noteContent);
    //     expect(storedNoteJSON.cnt).not.toMatch(noteContent + "I dislike school");
    
    // });
    
});
