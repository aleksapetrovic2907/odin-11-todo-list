import Project from "../models/project.js";
import Task from "../models/task.js";

/**
 * @param {Project} project
 */
export default class TaskService {
    constructor(project) {
        this.project = project;
    }

    createTask(name, description, dueDate) {
        const task = new Task(name, description, dueDate, this.project.Id);
        this.project.tasks.push(task);

        const event = new CustomEvent("taskCreated", {
            detail: { task },
        });

        document.dispatchEvent(event);

        return task;
    }

    getAllTasks() {
        return this.project.tasks;
    }

    getTaskById(id) {
        return this.project.tasks.find(t => t.id === id);
    }

    deleteTask(id) {
        this.project.tasks = this.project.tasks.filter(t => t.id !== id);
        const event = new CustomEvent("taskDeleted");
        document.dispatchEvent(event);
    }

    updateTask(id, data) {
        const task = this.getTaskById(id);

        if (task) {
            Object.assign(task, data);
        }

        const event = new CustomEvent("taskUpdated", {
            detail: { task },
        });

        document.dispatchEvent(event);
    }
}