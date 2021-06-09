import { Note, Task, Subtask, Event, Goal, Entry } from './object_files/objects.js';
import Dexie from 'dexie'
require("fake-indexeddb/auto");

export var db; //Global database variable

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

/**
 * Opens a database if it exists, creates one if it doesn't 
 * @param {string} username - Will be the name of the database
 * @returns {void} Nothing
 */
export async function openUserDB(username){   //This function opens a database. If it doesn't already exist, it creates one.
    db = new Dexie(username);
    db.version(1).stores({
        tasks: 'id++, entryDate, goal, subtaskids',
        subtasks: 'id++',
        notes: 'id++, entryDate',
        events: 'id++, entryDate',
        goals: 'description, entryDate'
    });
    db.tasks.mapToClass(Task);
    db.subtasks.mapToClass(Subtask);
    db.notes.mapToClass(Note);
    db.events.mapToClass(Event);
    db.goals.mapToClass(Goal);
    
    return Dexie.exists(username).then(function (exists) {return exists});
}   //Once this is done, we retun nothing but db stores the current user database so we can access its contents and only its contents

/**
 * Deletes the database if it exists, does nothing if it doesn't
 * @param {string} username - Name of the database
 * @return {boolean} If the database was deleted or not
 */
export async function deleteUserDB(username){
    
    Dexie.delete(username);
    let exist = await Dexie.exists(username);
    return exist;
}

/**
 * Stores entries, excluding subnotes
 * @param {Task|Note|Event|Goal} toStore - Will be the object stored
 * @returns {Entry} - The object that was stored
 */
export async function createEntry(toStore) { //This function takes a storable object and stores it in the appropriate table
    if(toStore instanceof Task){
        let temp = await db.tasks.put(toStore); //Store in DB and get ID
        toStore.id = temp; //Append ID to object
        db.tasks.update(temp, toStore); //Udpate object in DB
    }
    else if(toStore instanceof Note){
        let temp = await db.notes.put(toStore);
        toStore.id = temp;
        db.notes.update(temp, toStore);
    }
    else if(toStore instanceof Event){
        let temp = await db.events.put(toStore);
        toStore.id = temp;
        db.events.update(temp, toStore);
    }
    else if(toStore instanceof Goal){
        let temp = await db.goals.put(toStore);
        toStore.id = temp;
        db.goals.update(temp, toStore);
    }
    return toStore; //Returns the object for easy rendering after creation
}

/**
 * Edits entry content using a new object
 * @param {Entry} toEdit 
 * @returns {void} Nothing
 */
export function editEntry(toEdit){
    if(toEdit instanceof Task){
        db.tasks.update(toEdit.id, toEdit);
    }
    else if(toEdit instanceof Subtask){
        db.subtasks.update(toEdit.id, toEdit);
    }
    else if(toEdit instanceof Note){
        db.notes.update(toEdit.id, toEdit);
    }
    else if(toEdit instanceof Event){
        db.events.update(toEdit.id, toEdit);
    }
    else if(toEdit instanceof Goal){
        db.goals.update(toEdit.id, toEdit);
    }
    return toEdit;
}

/**
 * This function takes an existing object in the table and deletes it. If it doesn't exist, it doesn't delete anything.
 * @param {Entry} toDelete 
 * @returns {void} Nothing
 */
export function deleteEntry(toDelete){ //
    if(toDelete instanceof Task){
        db.tasks.delete(toDelete.id);
        toDelete.subtaskIds.forEach(curSubtaskId => deleteEntry(db.subtasks.get(curSubTaskId)));
    }
    else if(toDelete instanceof Subtask){
        let editTask = db.tasks.get(toStore.parentId);
        let index = editTask.subtaskIds.indexOf(toStore.id);
        editTask.subtaskIds.splice(index, 1);
        db.tasks.update(editTask.id, editTask);
        db.subtasks.delete(toDelete.id);
    }
    else if(toDelete instanceof Note){
        db.notes.delete(toDelete.id);
    }
    else if(toDelete instanceof Event){
        db.events.delete(toDelete.id);
    }
    else if(toDelete instanceof Goal){
        db.goals.delete(toDelete.id);
    }
}

/**
 * Sets the complete flag
 * @param {Task|Subtask} toComplete - Changes the toComplete flag to true
 * @return {Task|Subtask} Returns the object with the toComplete flag set to true
 */

export function completeTask(toComplete){
    if(toComplete instanceof Task){
        toComplete.isCompleted = true;
        db.tasks.update(toComplete.id, toComplete);
    }
    else if(toComplete instanceof Subtask){
        toComplete.isCompleted = true;
        db.subtask.update(toComplete.id, toComplete);
    }
    return toComplete;
}

/**
 * Returns all entries on a date.
 * @param {Date} dateIndex - The date object you want to access 
 * @returns {Array}  Array of arrays of Tasks, Subtasks, Notes, Events, Goals
 */
export async function getDateEntries(dateIndex) { //Get all of the entries on a given date
    let taskArr = await db.tasks.where("entryDate").equals(dateIndex).toArray();
    let subtaskArr = taskArr.forEach(curTask => getSubtasks(curTask));
    let noteArr = await db.notes.where("entryDate").equals(dateIndex).toArray();
    let eventArr = await db.events.where("entryDate").equals(dateIndex).toArray();
    let goalArr = await db.goals.where("entryDate").equals(dateIndex).toArray();

    return [taskArr, subtaskArr, noteArr, eventArr, goalArr]
}

function fmtDate(d) {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleString('en', options);
}

// get all dated entries?
export async function getDatedEntries() {
    var res = {};
    
    let taskArr = await db.tasks.toArray();
    for (var i = 0; i < taskArr.length; i++) {
        let sts = await getSubtasks(taskArr[i]);

        console.log(taskArr[i]);

        let key = fmtDate(taskArr[i].entryDate_m);
        if (!(key in res)) {
            res[key] = []
        }

        res[key].push({ t: taskArr[i], sts: sts });
    }

    let noteArr = await db.notes.toArray();
    let eventArr = await db.events.toArray();

    for (var i = 0; i < noteArr.length; i++) {
        let key = fmtDate(noteArr[i].entryDate_m);
        if (!(key in res)) {
            res[key] = []
        }

        res[key].push(noteArr[i]);
    }

    for (var i = 0; i < eventArr.length; i++) {
        let key = fmtDate(eventArr[i].entryDate_m);
        if (!(key in res)) {
            res[key] = []
        }

        res[key].push(eventArr[i]);
    }

    return res;
}

export async function getGoals() {
    let gs = await db.goals.toArray();
    let ngs = [];
    for (var i = 0; i < gs.length; i++) {
        let ts = await getGoalTasks(gs[i]);
        ngs.push({ g: gs[i], ts: ts });
    }
    return ngs;
}

/**
 * Returns all tasks for a goal
 * @param {Goal} goalIndex
 * @returns {[Task]} All the tasks associated with the input goal
 */
export async function getGoalTasks(goal){ //Get all of the entries (which are only tasks and their subtasks) of a given goal
    let taskArr = await db.tasks.where("goal").equals(goal.description).toArray();
    return taskArr;
}

/**
 * Adds a subtask to storage, updates its parent, and returns them both, updated 
 * @param {Task} taskToEdit
 * @param {Subtask} subToAdd
 * @returns {[Task, Subtask]} Returns an array with the first element as an updated task and the second as the updated subtask
 */
export async function addSubtask(taskToEdit, subToAdd){ //Add subtask to a task
    let temp = await db.subtasks.put(subToAdd);
    subToAdd.id = temp;
    subToAdd.parentID = taskToEdit.id;
    db.subtasks.update(temp, sutToAdd);
    taskToEdit.subtaskIds.push(temp);
    db.tasks.update(taskToEdit.id, taskToEdit);
    return [taskToEdit, subToAdd];
}

/**
 * Gets all the subtasks of a given task
 * @param {Task} taskIndex - Task we want to access
 * @returns {[Subtask]} All the subtasks of a given task
 */
export async function getSubtasks(taskIndex){ //Get all subtasks of a task
    let subtaskArr = [];
    taskIndex.subtaskIds.forEach(async id => await subtaskArr.push(db.subtasks.get(id)));
    return subtaskArr;
}