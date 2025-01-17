import Project from "../models/project.js";
import LocalStorageService from "./localStorageService.js";
import TaskService from "./taskService.js";

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

        const event = new CustomEvent("projectCreated", {
            detail: { project },
        });

        document.dispatchEvent(event);

        return project;
    }

    updateProject(projectId, name) {
        const targetProject = this.getProjectById(projectId);
        targetProject.name = name;

        const event = new CustomEvent("projectUpdated", {
            detail: { targetProject },
        });

        document.dispatchEvent(event);
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
    }

    getTaskServiceForProject(projectId) {
        const project = this.getProjectById(projectId);
        
        if (project) {
            return new TaskService(project);
        }

        return null;
    }

    saveProjectsToStorage() {
        this.storageService.save(PROJECTS_KEY_IN_STORAGE, this.projects);
    }
}