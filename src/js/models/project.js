import { v4 as uuidv4 } from 'uuid';

export default class Project {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
        this.tasks = [];
    }
}