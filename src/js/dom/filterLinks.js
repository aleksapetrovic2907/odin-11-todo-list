import trySelect from "./linksManager.js";

const allTasksLink = document.querySelector("#all-tasks");
const todaysTasksLink = document.querySelector("#todays-tasks");
const upcomingTasksLink = document.querySelector("#upcoming-tasks");

allTasksLink.addEventListener("click", () => {
    if (trySelect(allTasksLink)) {
        selectFilter("all");
    }
});

todaysTasksLink.addEventListener("click", () => {
    if (trySelect(todaysTasksLink)) {
        selectFilter("todays");
    }
});

upcomingTasksLink.addEventListener("click", () => {
    if (trySelect(upcomingTasksLink)) {
        selectFilter("upcoming");
    }
});

function selectFilter(filterType) {
    const event = new CustomEvent("projectLinkSelected", {
        detail: { type: filterType },
    });

    document.dispatchEvent(event);
}