import { v4 as uuidv4 } from 'uuid';

export default class Task {
    constructor(name, description, dueDate, projectId, isCompleted = false) {
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;

        this.projectId = projectId;
    }
}