var creationTool = require('./script');

describe('Creation of notes', function(){
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

        expect(keyArr[0]).toBe(noteJSON.key.toString());
        expect(localStorage.getItem(keyArr[0])).not.toBe(null);
        //window.localStorage.clear();
    });
    test('checks to make sure the first note holds the content and date properly', () => {
        let date = Date(2077, 12, 10, 4, 4, 4, 4);
        let keyArrString = localStorage.getItem(date);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        let noteString = localStorage.getItem(keyArr[0]);

        //fetched the note created in the last test
        expect(noteString).not.toBe(null);
        var storedNoteJSON = JSON.parse(noteString);
        expect(storedNoteJSON.cnt).toMatch("DAY 1 in hell: I have just signed up for another quarter of hurt.");
        expect(storedNoteJSON.cnt).not.toMatch("DAY 1 in hell: I have just signed up for another quarter of hurt." + "I dislike school");
    
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

    test('checks to make sure the first note holds the content and date properly', () => {
        let date = Date(2077, 12, 10, 4, 4, 4, 4);
        let keyArrString = localStorage.getItem(date);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        let noteString = localStorage.getItem(keyArr[1]);

        //fetched the note created in the last test
        expect(noteString).not.toBe(null);
        var storedNoteJSON = JSON.parse(noteString);
        expect(storedNoteJSON.cnt).toMatch("DAY 2 in hell: I have just signed up for another quarter of hurt.");
        expect(storedNoteJSON.cnt).not.toMatch("DAY 1 in hell: I have just signed up for another quarter of hurt.");
        expect(storedNoteJSON.dte).toBe(date);
    });

    //WOOOOOOOOOOOOOOOOOOOOOOOOO ~ if I wanna be more rigorous I'd try to add with different dates.
    //Also, note to self, I need to tell my team that we need the date to be an object that contains year month and day data.
    window.localStorage.clear();
});


describe('Creation of tasks and goals', function(){
    let content = "Survive until Summer"
    let date = Date(1984, 6, 8, 4, 4, 4, 4);
    let time = Date(2021, 5, 28, 4, 4, 4, 4);
    let goal = 'cool-goal';
    let priority = 5; 
    let task1;

    test('creates a goal',() => {
        expect(window.localStorage.getItem(goal)).toBe(null);
        creationTool.createGoal(goal);
        taskList = window.localStorage.getItem(goal)
        expect(taskList).not.toBe(null);
    });
    test('checks to make the task is accessible through the date of creation? when we make a note', () => {

        let taskJSON = creationTool.createTask(content, date, time, goal, priority)
        //let storedNote = window.localStorage.getItem(noteJSON.key);
        let keyArrString = localStorage.getItem(date);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        expect(keyArr[0]).not.toBe(null);
        expect(keyArr[0]).toBe(taskJSON.key.toString());
        expect(localStorage.getItem(keyArr[0])).not.toBe(null);
        task1 = taskJSON;
    });

    test('checks to make the task is accessible through the goal when we make a note', () => {
        //new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);
        let keyArrString = localStorage.getItem(goal);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        expect(keyArr[0]).not.toBe(null);
        expect(keyArr[0]).toBe(task1.key.toString());
        expect(localStorage.getItem(keyArr[0])).not.toBe(null);
    });

    test('checks to make the task is accessible through the priority when we make a note', () => {
        //new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);
        let keyArrString = localStorage.getItem(priority);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        expect(keyArr[0]).not.toBe(null);
        expect(keyArr[0]).toBe(task1.key.toString());
        expect(localStorage.getItem(keyArr[0])).not.toBe(null);
    });
    test('checks to make sure the first task holds content properly', () => {
        let keyArrString = localStorage.getItem(date);
        expect(keyArrString).not.toBe(null);
        let keyArr = JSON.parse(keyArrString);
        let taskString = localStorage.getItem(keyArr[0]);
        var storedTaskJSON = JSON.parse(taskString);
        expect(storedTaskJSON.cnt).toMatch(content);
        expect(storedTaskJSON.dte).toBe(date);
        expect(storedTaskJSON.tim).toBe(time);
        expect(storedTaskJSON.gol).toMatch(goal);
        expect(storedTaskJSON.prt).toBe(priority);

    });

    
});