export default class TemplateService {
    /**
     * Replaces placeholders in the template with provided values.
     * @param {string} template - The HTML template with placeholders (e.g., {{name}})
     * @param {Object} data - Key-value pairs where keys correspond to placeholders
     * @returns {string} - The updated template with replaced values
     */
    static render(template, data) {
        let renderedTemplate = template;

        // Replace placeholders with actual data
        for (const key in data) {
            renderedTemplate = renderedTemplate.replace(`{{${key}}}`, data[key]);
        }

        const div = document.createElement('div');
        div.innerHTML = renderedTemplate.trim();

        return div.firstElementChild;
    }
}