import LocalStorageService from "./services/localStorageService.js";
import ProjectsService from "./services/projectsService.js";

const storageService = new LocalStorageService();
const projectsService = new ProjectsService(storageService);

export { projectsService };