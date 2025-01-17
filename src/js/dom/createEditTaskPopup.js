import TaskPopupTemplateUrl from "../../html/popups/createEditTaskPopup.js";
import TemplateService from "../services/templateService.js";
import { projectsService } from "../index.js";
import { startOfDay } from "date-fns";

let displayedPopupNode = null;

function displayTaskPopup(projectId, taskId = null) {
    const isEditing = taskId !== null;

    let templateData;
    const todayDate = startOfDay(new Date());

    if (isEditing) {
        const targetTask = projectsService.getTaskServiceForProject(projectId).getTaskById(taskId);
        templateData = {
            taskName: targetTask.name,
            taskDescription: targetTask.description,
            taskDueDate: targetTask.dueDate,
            minTaskDueDate: todayDate
        }
    }
    else {
        templateData = {
            taskname: "",
            taskDescription: "",
            taskDueDate: startOfDay(new Date()),
            minTaskDueDate: todayDate
        }
    }

    displayedPopupNode = TemplateService.render(TaskPopupTemplateUrl, templateData);
    document.body.appendChild(displayedPopupNode);

    const form = displayedPopupNode.querySelector("#projectForm");
    const cancelButton = displayedPopupNode.querySelector(".popup__button--cancel");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleTaskFormSubmit(projectId, taskId, isEditing);
    });

    cancelButton.addEventListener("click", hideTaskPopup);
}

function handleTaskFormSubmit(projectId, taskId, isEditing) {
    const form = displayedPopupNode.querySelector("#projectForm");
    const formData = new FormData(form);
    const taskService = projectsService.getTaskServiceForProject(projectId);

    if (isEditing) {
        data = {
            name: formData.get("name"),
            description: formData.get("description"),
            dueDate: formData.get("dueDate"),
        };
        taskService.updateTask(taskId, data);
    } else {
        taskService.createTask(
            formData.get("name"),
            formData.get("description"),
            formData.get("dueDate"),
        );
    }

    hideProjectPopup();
}

function hideTaskPopup() {
    displayedPopupNode.remove();
}

export { displayTaskPopup };