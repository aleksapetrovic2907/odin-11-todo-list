export default class ColorService {
    /**
     * Generates a color with a hue modified by steps and preserves saturation and brightness.
     * @param {number} startingHue - The starting hue (0-360 degrees).
     * @param {number} stepRatio - The ratio by which to step the hue.
     * @param {number} steps - The number of steps to modify the hue.
     * @param {number} saturation - The saturation percentage (0-100).
     * @param {number} brightness - The brightness percentage (0-100).
     * @returns {string} - The HSL color string.
     */
    static getColorWithSteppedHue(startingHue, stepRatio, steps, saturation, brightness) {
        const newHue = (startingHue + stepRatio * steps) % 360;
        return `hsl(${normalizedHue}, ${saturation}%, ${brightness}%)`;
    }
}