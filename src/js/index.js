import 'normalize.css'
import '../css/styles.css'
import '../css/nav.css'
import '../css/projects.css';

import LocalStorageService from "./services/localStorageService.js";
import ProjectsService from "./services/projectsService.js";

import { selectFilter } from "./dom/filterLinks.js";
import "./dom/content.js";

const storageService = new LocalStorageService();
const projectsService = new ProjectsService(storageService);
window.onbeforeunload = () => { projectsService.saveProjectsToStorage() };

selectFilter("all");

export { projectsService };