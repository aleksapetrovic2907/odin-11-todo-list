export default class TemplateService {
    /**
     * Replaces placeholders in the template with provided values.
     * @param {string} template - The HTML template with placeholders (e.g., {{name}})
     * @param {Object} data - Key-value pairs where keys correspond to placeholders
     * @returns {string} - The updated template with replaced values
     */
    static render(template, data) {
        let renderedTemplate = template;

        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            renderedTemplate = renderedTemplate.replace(regex, data[key]);
        });

        return renderedTemplate;
    }
}