// class User {
//     /**
//      * Constructor user object
//      * @param {string} name is the name of the user 
//      * @param {string} email is the users email 
//      * @param {passwd} password is the users password. 
//      */
//     constructor(name = "", email = "", passwd = "") {
//         this.name_m = name;
//         this.email = email;
//         this.passwd = passwd;
//     }
// }

// /*******************************NOTE_MUST_READ*****************/
// // All goal will have an empty Task[] as their value if no tasks are provided
// class GoalHandler {
//     /**
//      * @param {map(Goal, Task[])} goalsToTasks, this maps all goals to their tasks. 
//      */
//     constructor(goalsToTasks = new Map()) {
//         this.goalsToTasks_m = goalsToTasks;
//     }

//     /**
//      * Add goal to a to map 
//      * @param {goal} goal is added to the map.  
//      * @param {Task} Task task is paired to goal if task is provided, else pair []
//      */
//     addGoal(goal, task = []) {
//         this.tasksToSubtasks_m.set(goal, task);
//     }
//     /**
//      * Add task to a goal
//      * @param {Goal} goal this is the goal that the task is being added to. 
//      * @param {Task} task task that is being mapped with the key = goal.
//      */
//     addTask(goal, task) {
//         getTasks(goal).push(task);
//     }

//     /**
//      * delete a task
//      * @param {Goal} goal this is the goal that the task is being added to. 
//      * @param {Task} task task that is being deleted.
//      */
//     deleteTask(goal, task) {
//         let tasks = this.getTasks(goal);
//         let index = tasks.indexOf(task);
//         tasks.splice(index, 1);
//     }

//     /**
//      * delete a goal from the map. 
//      * @param {goal} goal this is the goal in the map that is deleted. 
//      */
//     deleteGoal(goal) {
//         this.tasksToSubtasks_m.delete(goal);
//     }
//     /**
//      * This deletes the taskList that is associated with a goal
//      * @param {Goal} goal goal is the goals who's task list is being deleted.  
//      */
//     deleteTasks(goal) {
//         let tasks = this.getTasks(goal);
//         tasks = [];
//     }

//     /**
//      * Gets all the task for a certain list 
//      * @return {Goal[]} Goal array that is all the goals in the map.
//      */
//     getGoals() {
//         let goals = [];
//         let iterator = this.goalsToTasks_m.keys();
//         for (const goal of iterator) {
//             tasks.push(goal);
//         }
//         return goals;
//     }

//     /**
//      * This gets the taskList
//      * @param {Goal} goal goal is the goals who's task list you are getting.  
//      * @returns {Task[]} A array of Task that are mapped to the goal. 
//      */
//     getTasks(goal) {
//         if (this.goalsToTasks_m.has(goal)) {
//             return this.goalsToTasks_m.get(goal);
//         }
//         else {
//             this.goalsToTasks_m.set(goal, []);
//             return this.goalsToTasks_m.get(goal);
//         }
//     }
// }

// /*******************************NOTE_MUST_READ*****************/
// // All task will have an empty [] as there value if no subtasks are provided.
// class TaskHandler {
//     // maps tasks: keys to subTasks[]: value 
//     /**
//      * @param {map(Task, subTask[])} tasksToSubtasks, this maps all tasks to their subtasks. 
//      */
//     constructor(tasksToSubtasks = new Map()) {
//         this.tasksToSubtasks_m = tasksToSubtasks;
//     }

//     /**
//      * Add task to a to map 
//      * @param {Task} task this is the task that the subtask is being added to. 
//      * @param {subTask} subTask subtask that is being mapped with the key = task.
//      */
//     addTask(task, subtask = []) {
//         this.tasksToSubtasks_m.set(task, subtask);
//     }

//     /**
//      * Add task to a goal
//      * @param {Task} task this is the task that the subtask is being added to. 
//      * @param {subTask} subTask subtask that is being mapped with the key = task.
//      */
//     addSubtask(task, subtask) {
//         getTasks(task).push(subtask);
//     }

//     /**
//      * delete a task
//      * @param {Task} task this is the task that the subtask is being deleted from. 
//      * @param {Subtask} subtask subtask that is being deleted.
//      */
//     deleteTask(task) {
//         this.tasksToSubtasks_m.delete(task);
//     }


//     /**
//      * delete a subtask from the subtask list of a given task
//      * @param {Task} task this is the task that the subtask is being deleted from. 
//      * @param {Subtask} subtask subtask that is being deleted from array of subtask.
//      */
//     deleteSubtask(task, subtask) {
//         let subtasks = this.getSubtasks(task);
//         let index = subtasks.indexOf(subtask);
//         subtasks.splice(index, 1);
//     }

//     /**
//      * This deletes the taskList that is associated with a goal
//      * @param {task} task task is the task who's subtask list is being deleted.  
//      */
//     deleteSubtasks(task) {
//         let subtasks = this.getSubtasks(task);
//         subtasks = [];
//     }

//     /**
//      * This gets the subtask array
//      * @param {Task} Task task is the task who's subtask list getting.  
//      * @returns {subTask[]} A array of subTask that are mapped to the array. 
//      */
//     getSubtasks(task) {
//         if (this.tasksToSubtasks_m.has(task)) {
//             return this.tasksToSubtasks_m.get(task);
//         }
//         else {
//             this.tasksToSubtasks_m.set(task, []);
//             return this.tasksToSubtasks_m.get(task);
//         }
//     }

//     /**
//      * Gets all the task for a certain list 
//      * @return {Task[]} gets all goals array that is all the tasks associated with a goal.
//      */
//     getTasks() {
//         let tasks = [];
//         let iterator = this.tasksToSubtasks_m.keys();
//         for (const x of iterator) {
//             tasks.push(x);
//         }
//         return tasks;
//     }
// }



// class EntryDate {

//     constructor(day = "", month = "", year = "", time = "") {
//         this.day_m = day;
//         this.month_m = month;
//         this.year_m = year;
//         this.time_m = time;
//     }

//     set entryDateToPresent(date = new Date()) {
//         this.day_m = date.getDate();
//         this.month_m = date.getMonth();
//         this.year_m = date.getFullYear();
//         this.time_m.timeToPresent(date);
//     }



// }

// // uses 24 hour clock
// class Time {
//     constructor(hour = "", min = "", sec = "") {
//         this.hour_m = hour;
//         this.min_m = min;
//         this.sec_m = sec;
//     }
//     set timeToPresent(date = new Date()) {
//         this.hour_m = date.getHours();
//         this.min_m = date.getMonth();
//         this.sec_m = date.getSeconds();
//     }
// }

export class Entry {
    constructor(text = "", entryDate = new Date()) {
        this.text_m = text;
        this.entryDate_m = entryDate;
    }
}

export class Note extends Entry {
    id;
    constructor(text, entryDate = new Date()) {
        super(text, entryDate);
    }

}

export class Task extends Entry {
    id;
    subtaskIds = [];
    constructor(description = "", text = "",  entryDate = new Date(), goal = "", isCompleted = false) {
        super(text, entryDate);
        this.description = description;
        this.isCompleted = isCompleted;
        this.goal = goal;
    }
}


export class Subtask extends Entry {
    parentId;
    constructor(text = "", isCompleted = false, id="") {
        this.text = text;
        this.isCompleted = isCompleted;
    }
}

export class Event extends Entry {
    constructor(text = "", entryDate = new Date(), isCompleted = false, ) {
        super(text, entryDate);
        
    }
}


export class Goal extends Entry {
    constructor(description = "", text = "", entryDate = new Date(), isCompleted = false) {
        super(text, entryDate);
        this.description = description;
    }
}