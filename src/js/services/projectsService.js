import Project from "../models/project.js";
import LocalStorageService from "./localStorageService.js";

const PROJECTS_KEY_IN_STORAGE = "projects";

/**
 * @param {LocalStorageService} storageService
 */
export default class ProjectsService {
    constructor(storageService) {
        this.storageService = storageService;
        this.projects = storageService.load(PROJECTS_KEY_IN_STORAGE) || [];
    }

    getAllProjects() {
        return this.projects;
    }
    
    getProjectById(projectId) {
        return this.projects.find(p => p.id === projectId);
    }

    createProject(name) {
        const project = new Project(name);
        this.projects.push(project);
        this.storageService.save(PROJECTS_KEY_IN_STORAGE, this.projects);
        return project;
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.storageService.save(PROJECTS_KEY_IN_STORAGE, this.projects);
    }
}