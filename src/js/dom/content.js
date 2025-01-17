import projectTemplateUrl from "../../html/content/project.html";
import taskTemplateUrl from "../../html/content/task.html";
import filterTypeTitleTemplateUrl from "../../html/content/filterTitle.html";

import { projectsService } from "../index.js";
import { filterAll, filterTodays, filterUpcoming } from "./filterer.js";
import TemplateService from "../services/templateService.js";
import { format, isPast, isToday, isFuture } from "date-fns";
import { displayProjectPopup } from "./createEditProjectPopup.js";
import { displayTaskPopup } from "./createEditTaskPopup.js";

const projectsNode = document.querySelector(".projects");
let displayedProjectsList = null;
let filterer = null;

subscribeToEvents();

function subscribeToEvents() {
    document.addEventListener("projectLinkSelected", (e) => {
        filterer = null;
        displayProjects([projectsService.getProjectById(e.detail.projectId)]);
    });

    document.addEventListener("filterLinkSelected", (e) => {
        selectFilterer(e.detail.filterType);
        const filteredProjects = filterer(projectsService.getAllProjects());
        displayProjects(filteredProjects);
    });

    document.addEventListener("projectCreated", () => displayProjects(displayedProjectsList));
    document.addEventListener("projectUpdated", () => displayProjects(displayedProjectsList));
    document.addEventListener("taskCreated", () => displayProjects(displayedProjectsList));
    document.addEventListener("taskDeleted", () => displayProjects(displayedProjectsList));
    document.addEventListener("taskUpdated", () => displayProjects(displayedProjectsList));
}

function selectFilterer(filterType) {
    switch (filterType) {
        case "all":
            filterer = filterAll;
            break;

        case "todays":
            filterer = filterTodays;
            break;

        case "upcoming":
            filterer = filterUpcoming;
            break;

        default:
            break;
    }
}

function displayProjects(projects) {
    displayedProjectsList = projects;
    projectsNode.innerHTML = "";

    const filterTitleNode = generateFilterTitleNode();
    if (filterTitleNode) {
        projectsNode.appendChild(filterTitleNode);
    }

    projects.forEach(p => {
        const projectNode = generateProjectNode(p);
        projectsNode.appendChild(projectNode);
    });
}

function generateFilterTitleNode() {
    if (!filterer) return null;

    let filterTitle = "";
    switch (filterer) {
        case filterAll:
            filterTitle = "All";
            break;

        case filterTodays:
            filterTitle = "Today";
            break;

        case filterUpcoming:
            filterTitle = "Upcoming";
            break;
    }
    const data = { title: filterTitle}
    const filterTitleNode = TemplateService.render(filterTypeTitleTemplateUrl, data);
    return filterTitleNode;
}

function generateProjectNode(project) {
    const data = { name: project.name };
    const projectNode = TemplateService.render(projectTemplateUrl, data);
    const tasksNode = projectNode.querySelector(".tasks");

    const editProjectNode = projectNode.querySelector(".project-name-container svg");
    editProjectNode.addEventListener("click", () => displayProjectPopup(project.id));

    project.tasks.forEach(t => {
        const taskNode = generateTaskNode(project, t);
        tasksNode.appendChild(taskNode);
    });

    const addTaskNode = projectNode.querySelector(".add-task");
    addTaskNode.addEventListener("click", () => displayTaskPopup(project.id));

    return projectNode;
}

function generateTaskNode(project, task) {
    const data = {
        name: task.name,
        dueDate: format(task.dueDate, "MMMM d, yyyy"),
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
    });

    const dueDateNode = taskNode.querySelector(".task__details-dueDate");
    dueDateNode.classList.add(getClassNameForDueDate(task.dueDate));

    const editTaskNode = taskNode.querySelector(".task-edit");
    editTaskNode.addEventListener("click", () => {
        displayTaskPopup(project.id, task.id);
    });

    return taskNode;
}

function getClassNameForDueDate(dueDate) {
    if (isToday(dueDate)) return "due-date--present";
    if (isPast(dueDate)) return "due-date--past";
    if (isFuture(dueDate)) return "due-date--future";
}

export { displayProjects };
