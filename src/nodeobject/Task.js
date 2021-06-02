export class Task {
    constructor(date, content, time, goal, priority, subTasks = null, isComplete = false) {
        this.date = date;
        this.content = content;
        this.time = time;
        this.goal = goal;
        this.priority = priority;
        this.subTasks = subTasks;
        this.isComplete = isComplete; 
    }
}
  