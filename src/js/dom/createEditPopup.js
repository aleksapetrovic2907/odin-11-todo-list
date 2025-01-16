import PopupTemplateUrl from "../../html/popups/project-popup.html";
import TemplateService from "../services/templateService.js";
import { projectsService } from "../index.js";

let displayedPopupNode = null;

function displayProjectPopup(targetProjectId = null) {
    const data = {
        formTitle: targetProjectId ? "Create Project" : "Edit Project",
        projectName: targetProjectId ? "" : projectsService.getProjectById(targetProjectId),
        formSubmitButtonText: targetProjectId ? "Create" : "Save"
    }

    displayedPopupNode = TemplateService.render(PopupTemplateUrl, data);
    document.body.appendChild(displayedPopupNode);

    const submitButton = displayedPopupNode.querySelector(".popup__button--save");
    const cancelButton = displayedPopupNode.querySelector(".popup__button--cancel");

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleProjectFormSubmit(targetProjectId);
    });

    cancelButton.addEventListener("click", hideProjectPopup);
}

function handleProjectFormSubmit(targetProjectId) {
    const form = displayedPopupNode.querySelector("#projectForm");
    const formData = new FormData(form);

    if (targetProjectId) {
        // TODO: Implement project updating in projects service
        // projectsService.updateProject(targetProjectId, projectData);
    } else {
        projectsService.createProject(formData.get("name"));
    }

    hideProjectPopup();
}

function hideProjectPopup() {
    displayedPopupNode.remove();
}

export { displayProjectPopup };