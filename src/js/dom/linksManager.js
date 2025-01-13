let selectedLink = null;

export default function select(link) {
    if (link === selectedLink) return;

    if (selectedLink) {
        selectedLink.classList.remove("selected");
    }

    selectedLink = link;
    selectedLink.classList.add("selected");
}