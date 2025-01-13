import projectLinkTemplateUrl from "../../html/user-panel/project-link.html";

import { projectsService } from "../index.js";
import TemplateService from "../services/templateService.js";

const projectLinks = document.querySelector(".project-links");

function refreshProjectLinks() {
    projectLinks.innerHTML = "";

    const projects = projectsService.getAllProjects();
    projects.forEach(p => {
        const data = { name: p.name, };
        const projectLink = TemplateService.render(projectLinkTemplateUrl, data);
        projectLinks.appendChild(projectLink);
    });
}

export { refreshProjectLinks, projectLinks };