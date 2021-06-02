import { Note } from './Note.js';
import { Task } from './Task.js';
import { Goal } from './Goal.js';

function createNote(content, date) {
    return new Note(date, content);
}
// function store(thingToStore){
//     if (thingstore instanceof note){
//         storeNote(thing)
//     }
// }
function storeNote(note){
    // localStorage.setItem(`${key}`, JSON.stringify(noteJSON));
    // //Checks if the date index exists, and inserts the note into the date index in localStorage
    // let dateIndex = localStorage.getItem(`${date}`);
    // if(dateIndex == null){
    //     localStorage.setItem(`${date}`, JSON.stringify([key]))
    // } else {
    //     newIndex = JSON.parse(dateIndex).push(key);
    //     localStorage.setItem(`${date}`, JSON.stringify(newIndex));
    // }
    // //Returns the noteJSON to easily pass into the HTML element rendering function
    // return noteJSON;
}

function createTask(date, content, subTasks, time, goal, priority, isComplete) {
    return new Task(date, content, subTasks, time, goal, priority, isComplete);
}

function storeTask(task){
    // localStorage.setItem(`${key}`, JSON.stringify(taskJSON));
    // //Checks if the date index exists, and inserts the task into the date index in localStorage
    // let dateIndex = localStorage.getItem(`${date}`);
    // if(dateIndex == null){
    //     localStorage.setItem(`${date}`, JSON.stringify([key]))
    // } else {
    //     newIndex = JSON.parse(dateIndex).push(key);
    //     localStorage.setItem(`${date}`, JSON.stringify(newIndex));
    // }
    // //Inserts the task into the goal index in localStorage
    // newIndex = JSON.parse(localStorage.getItem(`${goal}`)).push(key);
    // localStorage.setItem(`${goal}`, newIndex);
    // //Checks if the priority index exists, and inserts the task into the priority index in localStorage
    // priorityIndex = localStorage.getItem(`${priority}`);
    // if(priorityIndex == null){
    //     localStorage.setItem(`${priority}`, JSON.stringify([key]))
    // } else {
    //     newIndex = JSON.parse(priorityIndex).push(key);
    //     localStorage.setItem(`${priority}`, JSON.stringify(newIndex));
    // }
    // //Returns the noteJSON to easily pass into the HTML element rendering function
    // return taskJSON;
}

function createGoal(name) {
    return new Goal(name);
}

function storeGoal(goal){
    //localStorage.setItem(name, JSON.stringify([]));
}
function editNote(key, content, date) {
    let noteJSON = JSON.parse(localStorage.getItem(key));
    //Edit content if necessary
    if(content != null){
        noteJSON.cnt = content;
    }
    //Edit date if necessary
    if(date != null){
        //Delete the listing in the old index
        oldIndex = JSON.parse(localStorage.getItem(`${noteJSON.dte}`));
        oldIndex.splice(oldIndex.indexOf(key), 1);
        localStorage.setItem(`${noteJSON.dte}`, JSON.stringify(oldIndex));
        //Store the lising in the new index
        let dateIndex = localStorage.getItem(`${date}`);
        if(dateIndex == null){
            localStorage.setItem(`${date}`, JSON.stringify([key]))
        } else {
            newIndex = JSON.parse(dateIndex).push(key);
            localStorage.setItem(`${date}`, JSON.stringify(newIndex));
        }
        noteJSON.dte = date;
    }
    //Write changes to local storage
    localStorage.setItem(noteKey, JSON.stringify(noteJSON));
}

function editTask(key, content, date, time, goal, priority, subitem) {
    let taskJSON = JSON.parse(localStorage.getItem(key));
    let oldIndex;
    //Edit content if necessary
    if(content != null){
        taskJSON.cnt = content;
    }
    //Edit date if necessary
    if(date != null){
        //Delete the listing in the old index
        oldIndex = JSON.parse(localStorage.getItem(`${taskJSON.dte}`));
        oldIndex.splice(oldIndex.indexOf(key), 1);
        localStorage.setItem(`${taskJSON.dte}`, JSON.stringify(oldIndex));
        //Store the lising in the new index
        let dateIndex = localStorage.getItem(`${date}`);
        if(dateIndex == null){
            localStorage.setItem(`${date}`, JSON.stringify([key]))
        } else {
            newIndex = JSON.parse(dateIndex).push(key);
            localStorage.setItem(`${date}`, JSON.stringify(newIndex));
        }
        taskJSON.dte = date;
    }
    if(time != null){
        taskJSON.tme = time;
    }
    if(goal != null){
        oldIndex = JSON.parse(localStorage.getItem(`${taskJSON.gol}`));
        oldIndex.splice(oldIndex.indexOf(key), 1);
        localStorage.setItem(`${taskJSON.gol}`, JSON.stringify(oldIndex));
        //Store the lising in the new index
        let newIndex = JSON.parse(localStorage.getItem(`${goal}`)).push(key);
        localStorage.setItem(`${goal}`, newIndex);
        taskJSON.gol = goal;
    }
    if(priority != null){
        oldIndex = JSON.parse(localStorage.getItem(`${taskJSON.prt}`));
        oldIndex.splice(oldIndex.indexOf(key), 1);
        localStorage.setItem(`${taskJSON.prt}`, JSON.stringify(oldIndex));
        priorityIndex = localStorage.getItem(`${priority}`);
        if(priorityIndex == null){
            localStorage.setItem(`${priority}`, JSON.stringify([key]))
        } else {
            newIndex = JSON.parse(priorityIndex).push(key);
            localStorage.setItem(`${priority}`, JSON.stringify(newIndex));
        }
        taskJSON.prt = priority;
    }
    if(subitem != null){
        //If the subitem isn't in storage, store it, if it is in storage, remove it
        if(taskJSON.sub.indexOf(subitem) == -1){
            taskJSON.sub.push(subitem);
        } else {
            taskJSON.sub.splice(taskJSON.sub.indexOf(subitem), 1);
        }
    }
    //Write changes to local storage
    localStorage.setItem(noteKey, JSON.stringify(taskJSON));
}

function editGoal(key, name) {
    //Store old items with the new name
    let goalIndex = localStorage.getItem(key);
    localStorage.setItem(name, goalIndex);
    localStorage.removeItem(key);
    //Replace all instances of the old goal name with the new goal name
    let editIndex = JSON.parse(localStorage.getItem(key));
    for(let i = 0; i < editIndex.length; i++){
        let curKey = localStorage.getItem(`${editIndex[i]}`);
        let cur = JSON.parse(localStorage.getItem(`${curKey}`));
        cur.gol = name;
    }
}

function deleteNote(key) {
    let noteJSON = JSON.parse(localStorage.getItem(key));
    //Delete the note in the date index
    let oldIndex = JSON.parse(localStorage.getItem(`${noteJSON.dte}`));
    oldIndex.splice(oldIndex.indexOf(key), 1);
    localStorage.setItem(`${noteJSON.dte}`, JSON.stringify(oldIndex));
    //Delete the note itself
    localStorage.removeItem(key);
}

function deleteTask(key) {
    let taskJSON = JSON.parse(localStorage.getItem(key));
    //Delete the listing in the old date index
    let oldIndex = JSON.parse(localStorage.getItem(`${taskJSON.dte}`));
    oldIndex.splice(oldIndex.indexOf(key), 1);
    localStorage.setItem(`${taskJSON.dte}`, JSON.stringify(oldIndex));
    //Delete the listing in the old goal index
    oldIndex = JSON.parse(localStorage.getItem(`${taskJSON.gol}`));
    oldIndex.splice(oldIndex.indexOf(key), 1);
    localStorage.setItem(`${taskJSON.gol}`, JSON.stringify(oldIndex));
    //Delete the listing in the old priority index
    oldIndex = JSON.parse(localStorage.getItem(`${taskJSON.prt}`));
    oldIndex.splice(oldIndex.indexOf(key), 1);
    localStorage.setItem(`${taskJSON.prt}`, JSON.stringify(oldIndex));
    //Delete the task itself
    localStorage.removeItem(key);
}

function deleteGoal(key) {
    //Remove all the tasks associated with this goal
    let goalJSON = JSON.parse(localStorage.getItem(key));
    for(let i = 0; i < goalJSON.length; i++){
        deleteTask(goalJSON[i]);
    }
    //Remove the goal index itself.
    localStorage.removeItem(key);
}
