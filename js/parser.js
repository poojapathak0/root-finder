//logic : equation parsing
/**
 * Parser for handling mathematical expressions
 */
class EquationParser {
    /**
     * Constructor for the equation parser
     * @param {string} equation - The equation string to parse
     */
    constructor(equation) {
        this.originalEquation = equation;
        this.parseEquation();
    }
    
    /**
     * Parse the equation into a standardized form
     */
    parseEquation() {
        // If the equation contains an equals sign, move everything to one side
        if (this.originalEquation.includes('=')) {
            const parts = this.originalEquation.split('=');
            if (parts.length !== 2) {
                throw new Error('Invalid equation format. Please use a single equals sign.');
            }
            
            // Move everything to the left side: left - right = 0
            this.equation = `(${parts[0]})-(${parts[1]})`;
        } else {
            // Assume the equation is already in the form f(x) = 0
            this.equation = this.originalEquation;
        }
    }
    
    /**
     * Evaluate the function at a given x value
     * @param {number} x - The x value to evaluate
     * @returns {number} - The function value at x
     */
    evaluate(x) {
        try {
            // Use math.js to evaluate the expression
            return math.evaluate(this.equation, { x });
        } catch (error) {
            throw new Error(`Error evaluating equation: ${error.message}`);
        }
    }
    
    /**
     * Calculate the derivative of the function at a given point
     * @param {number} x - The point at which to calculate the derivative
     * @param {number} h - The step size for numerical differentiation
     * @returns {number} - The approximate derivative at x
     */
    evaluateDerivative(x, h = 0.0001) {
        // Use central difference method for better accuracy
        const fxPlusH = this.evaluate(x + h);
        const fxMinusH = this.evaluate(x - h);
        return (fxPlusH - fxMinusH) / (2 * h);
    }
    
    /**
     * Get a range of x and y values for plotting
     * @param {number} start - The start of the x range
     * @param {number} end - The end of the x range
     * @param {number} points - The number of points to calculate
     * @returns {Object} - An object containing x and y arrays
     */
    getPlotData(start, end, points = 100) {
        const xValues = [];
        const yValues = [];
        
        const step = (end - start) / (points - 1);
        
        for (let i = 0; i < points; i++) {
            const x = start + i * step;
            xValues.push(x);
            
            try {
                const y = this.evaluate(x);
                yValues.push(y);
            } catch (error) {
                // If evaluation fails (e.g., division by zero), add null
                yValues.push(null);
            }
        }
        
        return { x: xValues, y: yValues };
    }
}