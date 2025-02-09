import PopupTemplateUrl from "../../html/popups/createEditProjectPopup.html";
import TemplateService from "../services/templateService.js";
import { projectsService } from "../index.js";

let displayedPopupNode = null;

function displayProjectPopup(targetProjectId = null) {
    const isEditing = targetProjectId !== null;

    const data = {
        formTitle: isEditing ? "Edit Project" : "Add Project",
        projectName: isEditing ? projectsService.getProjectById(targetProjectId).name : "",
        formSubmitButtonText: isEditing ? "Save" : "Create"
    }

    displayedPopupNode = TemplateService.render(PopupTemplateUrl, data);
    document.body.appendChild(displayedPopupNode);

    const form = displayedPopupNode.querySelector("#projectForm");
    const cancelButton = displayedPopupNode.querySelector(".popup__button--cancel");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleProjectFormSubmit(targetProjectId, isEditing);
    });

    cancelButton.addEventListener("click", hideProjectPopup);
}

function handleProjectFormSubmit(targetProjectId, isEditing) {
    const form = displayedPopupNode.querySelector("#projectForm");
    const formData = new FormData(form);

    if (isEditing) {
        projectsService.updateProject(targetProjectId, formData.get("name"));
    } else {
        projectsService.createProject(formData.get("name"));
    }

    hideProjectPopup();
}

function hideProjectPopup() {
    displayedPopupNode.remove();
}

export { displayProjectPopup };