import 'normalize.css'
import '../css/styles.css'
import '../css/nav.css'
import '../css/projects.css';
import '../css/popups.css';

import LocalStorageService from "./services/localStorageService.js";
import ProjectsService from "./services/projectsService.js";

import { selectFilter } from "./dom/filterLinks.js";
import "./dom/content.js";
import { refreshProjectLinks } from './dom/projectLinks.js';

const storageService = new LocalStorageService();
const projectsService = new ProjectsService(storageService);
window.onbeforeunload = () => { projectsService.saveProjectsToStorage() };

selectFilter("all");
refreshProjectLinks();

export { projectsService };