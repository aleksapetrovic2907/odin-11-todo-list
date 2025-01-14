import projectTemplateUrl from "../../html/content/project.html";
import taskTemplateUrl from "../../html/content/task.html";

import { projectsService } from "../index.js";
import { filterAll, filterTodays, filterUpcoming } from "./filterer.js";
import TemplateService from "../services/templateService.js";
import { format } from "date-fns";

const projectsNode = document.querySelector(".projects");
let displayedProjectsList = null;
let filterer = filterAll;

subscribeToEvents();

function subscribeToEvents() {
    document.addEventListener("projectLinkSelected", (e) => {
        displayProjects([projectsService.getProjectById(e.detail.projectId)]);
    });

    document.addEventListener("filterLinkSelected", (e) => {
        selectFilterer(e.detail.filterType);
        const filteredProjects = filterer(projectsService.getAllProjects());
        displayProjects(filteredProjects);
    });
}

function selectFilterer(filterType) {
    switch (filterType) {
        case "all":
            filterer = filterAll;
            break;

        case "todays":
            filterer = filterTodays;

        case "upcoming":
            filterer = filterUpcoming;

        default:
            break;
    }
}

function displayProjects(projects) {
    displayedProjectsList = projects;

    projectsNode.innerHTML = "";
    projects.forEach(p => {
        const projectNode = generateProjectNode(p);
        projectsNode.appendChild(projectNode);
    });
}

function generateProjectNode(project) {
    const data = { name: project.name };
    const projectNode = TemplateService.render(projectTemplateUrl, data);
    const tasksNode = projectNode.querySelector(".tasks");

    project.tasks.forEach(t => {
        const taskNode = generateTaskNode(project, t);
        tasksNode.appendChild(taskNode);
    });

    projectNode.appendChild(tasksNode);
    return projectNode;
}

function generateTaskNode(project, task) {
    const data = {
        name: task.name,
        dueDate: format(new Date(task.dueDate), "MMMM d, yyyy"),
        tooltipText: task.description,
    };

    const taskNode = TemplateService.render(taskTemplateUrl, data);

    const tooltip = taskNode.querySelector(".task-tooltip");
    if (!task.description) {
        tooltip.remove();
    }

    const taskService = projectsService.getTaskServiceForProject(project.id);
    const deleteBtn = taskNode.querySelector(".task-delete");
    deleteBtn.addEventListener("click", () => {
        taskService.deleteTask(task.id);
        displayProjects(displayedProjectsList);
    });
    
    // TODO: Add event listeners to edit task.

    return taskNode;
}

export { displayProjects };
