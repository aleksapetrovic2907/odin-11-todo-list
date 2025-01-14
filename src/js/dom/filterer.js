import { isToday, isFuture, parseISO } from "date-fns";

function filterAll(projects) {
    return projects;
}

function filterTodays(projects) {
    return projects.filter((project) =>
        project.tasks.some((task) => isToday(parseISO(task.dueDate)))
    );
}

function filterUpcoming(projects) {
    return projects.filter((project) =>
        project.tasks.some(
            (task) => isFuture(parseISO(task.dueDate))
        )
    );
}

export { filterAll, filterTodays, filterUpcoming };