import projectLinkTemplateUrl from "../../html/nav/project-link.html";

import { projectsService } from "../index.js";
import TemplateService from "../services/templateService.js";
import trySelect from "./linksManager.js";
import ColorService from "../services/colorService.js";
import { displayProjectPopup } from "./createEditPopup.js";

const projectLinks = document.querySelector(".project-links");
const addProjectButton = document.querySelector("#add-project");
addProjectButton.addEventListener("click", () => displayProjectPopup());

function refreshProjectLinks() {
    projectLinks.innerHTML = "";
    const projects = projectsService.getAllProjects();
    
    projects.forEach((p, index) => {
        const data = { name: p.name, };
        const projectLink = TemplateService.render(projectLinkTemplateUrl, data);
        projectLink.addEventListener("click", () => {
            if (trySelect(projectLink)) {
                const event = new CustomEvent("projectLinkSelected", {
                    detail: { projectId: p.id },
                });

                document.dispatchEvent(event);
            }
        });

        const hashtagSVG = projectLink.querySelector("svg");
        hashtagSVG.style.fill = ColorService.getColorWithSteppedHue(0, 75, index, 70, 55);

        projectLinks.appendChild(projectLink);
    });
}

export { refreshProjectLinks, projectLinks };