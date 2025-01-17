import TaskPopupTemplateUrl from "../../html/popups/createEditTaskPopup.html";
import TemplateService from "../services/templateService.js";
import { projectsService } from "../index.js";
import { startOfDay, format } from "date-fns";

let displayedPopupNode = null;

function displayTaskPopup(projectId, taskId = null) {
    const isEditing = taskId !== null;

    let templateData;
    const todayDate = format(startOfDay(new Date()), "yyyy-MM-dd");

    if (isEditing) {
        const targetTask = projectsService.getTaskServiceForProject(projectId).getTaskById(taskId);
        templateData = {
            formTitle: "Edit Task",
            formSubmitButtonText: "Save",
            taskName: targetTask.name,
            taskDescription: targetTask.description,
            taskDueDate: format(targetTask.dueDate, "yyyy-MM-dd"),
            minTaskDueDate: todayDate
        }
    }
    else {
        templateData = {
            formTitle: "Add Task",
            formSubmitButtonText: "Add",
            taskname: "",
            taskDescription: "",
            taskDueDate: todayDate,
            minTaskDueDate: todayDate
        }
    }

    displayedPopupNode = TemplateService.render(TaskPopupTemplateUrl, templateData);
    document.body.appendChild(displayedPopupNode);

    const form = displayedPopupNode.querySelector("#taskForm");
    const cancelButton = displayedPopupNode.querySelector(".popup__button--cancel");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleTaskFormSubmit(projectId, taskId, isEditing);
    });

    cancelButton.addEventListener("click", hideTaskPopup);
}

function handleTaskFormSubmit(projectId, taskId, isEditing) {
    const form = displayedPopupNode.querySelector("#taskForm");
    const formData = new FormData(form);
    const taskService = projectsService.getTaskServiceForProject(projectId);

    if (isEditing) {
        let data = {
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

    hideTaskPopup();
}

function hideTaskPopup() {
    displayedPopupNode.remove();
}

export { displayTaskPopup };