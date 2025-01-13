let selectedLink = null;

/**
 * Attempts to select a given link element by adding a "selected" class to it.
 * If another link is already selected, it removes the "selected" class from that link.
 * 
 * @param {HTMLElement} link - The link element to be selected.
 * @returns {boolean} - Returns `true` if the link was successfully selected, or `false` if the given link was already selected.
 */
export default function trySelect(link) {
    if (link === selectedLink) return false;

    if (selectedLink) {
        selectedLink.classList.remove("selected");
    }

    selectedLink = link;
    selectedLink.classList.add("selected");
    return true;
}