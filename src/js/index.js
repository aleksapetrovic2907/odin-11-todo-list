import 'normalize.css'
import '../css/styles.css'
import '../css/nav.css'

import LocalStorageService from "./services/localStorageService.js";
import ProjectsService from "./services/projectsService.js";

const storageService = new LocalStorageService();
const projectsService = new ProjectsService(storageService);

window.onbeforeunload = () => { projectsService.saveProjectsToStorage() };

export { projectsService };