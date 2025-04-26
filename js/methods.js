//numerical methods (functionality)
/**
 * Class for numerical root-finding methods
 */
class NumericalMethods {
    /**
     * Constructor for the numerical methods
     * @param {EquationParser} parser - The equation parser object
     */
    constructor(parser) {
        this.parser = parser;
    }
    
    /**
     * Bisection method for root finding
     * @param {number} a - The lower bound of the interval
     * @param {number} b - The upper bound of the interval
     * @param {number} tolerance - The error tolerance
     * @param {number} maxIterations - Maximum number of iterations
     * @returns {Object} - The result with root, iterations, and error
     */
    bisection(a, b, tolerance = 0.0001, maxIterations = 50) {
        // Initialize result storage
        const iterations = [];
        
        // Check initial conditions
        const fa = this.parser.evaluate(a);
        const fb = this.parser.evaluate(b);
        
        // Check if the initial interval is valid
        if (fa * fb >= 0) {
            throw new Error('Function should have opposite signs at interval endpoints');
        }
        
        let c, fc;
        let error = Math.abs(b - a);
        
        // Add initial values to iterations
        iterations.push({
            iteration: 0,
            a,
            b,
            c: '-',
            fa,
            fb,
            fc: '-',
            error
        });
        
        // Perform iterations
        for (let i = 1; i <= maxIterations; i++) {
            // Calculate midpoint
            c = (a + b) / 2;
            fc = this.parser.evaluate(c);
            
            // Update error
            error = Math.abs(b - a) / 2;
            
            // Add to iterations
            iterations.push({
                iteration: i,
                a,
                b,
                c,
                fa,
                fb,
                fc,
                error
            });
            
            // Check for convergence
            if (Math.abs(fc) < tolerance || error < tolerance) {
                return {
                    root: c,
                    functionValue: fc,
                    iterations,
                    error,
                    converged: true
                };
            }
            
            // Update interval
            if (fa * fc < 0) {
                b = c;
                fb = fc;
            } else {
                a = c;
                fa = fc;
            }
        }
        
        // Return result if maximum iterations reached
        return {
            root: c,
            functionValue: fc,
            iterations,
            error,
            converged: false
        };
    }
    
    /**
     * Newton-Raphson method for root finding
     * @param {number} x0 - The initial guess
     * @param {number} tolerance - The error tolerance
     * @param {number} maxIterations - Maximum number of iterations
     * @returns {Object} - The result with root, iterations, and error
     */
    newtonRaphson(x0, tolerance = 0.0001, maxIterations = 50) {
        // Initialize result storage
        const iterations = [];
        
        let x = x0;
        let fx = this.parser.evaluate(x);
        let error = Math.abs(fx);
        
        // Add initial value to iterations
        iterations.push({
            iteration: 0,
            x,
            fx,
            derivative: '-',
            error
        });
        
        // Perform iterations
        for (let i = 1; i <= maxIterations; i++) {
            // Calculate derivative
            const derivative = this.parser.evaluateDerivative(x);
            
            // Check if derivative is too close to zero
            if (Math.abs(derivative) < 1e-10) {
                throw new Error('Derivative is too close to zero');
            }
            
            // Calculate next x
            const nextX = x - fx / derivative;
            const nextFx = this.parser.evaluate(nextX);
            
            // Calculate error
            error = Math.abs(nextX - x);
            
            // Add to iterations
            iterations.push({
                iteration: i,
                x: nextX,
                fx: nextFx,
                derivative,
                error
            });
            
            // Update x and fx
            x = nextX;
            fx = nextFx;
            
            // Check for convergence
            if (Math.abs(fx) < tolerance || error < tolerance) {
                return {
                    root: x,
                    functionValue: fx,
                    iterations,
                    error,
                    converged: true
                };
            }
        }
        
        // Return result if maximum iterations reached
        return {
            root: x,
            functionValue: fx,
            iterations,
            error,
            converged: false
        };
    }
    
    /**
     * Secant method for root finding
     * @param {number} x0 - The first initial guess
     * @param {number} x1 - The second initial guess
     * @param {number} tolerance - The error tolerance
     * @param {number} maxIterations - Maximum number of iterations
     * @returns {Object} - The result with root, iterations, and error
     */
    secant(x0, x1, tolerance = 0.0001, maxIterations = 50) {
        // Initialize result storage
        const iterations = [];
        
        let x_prev = x0;
        let x_curr = x1;
        let fx_prev = this.parser.evaluate(x_prev);
        let fx_curr = this.parser.evaluate(x_curr);
        let error = Math.abs(x_curr - x_prev);
        
        // Add initial values to iterations
        iterations.push({
            iteration: 0,
            x_prev,
            x_curr: '-',
            fx_prev,
            fx_curr: '-',
            error: '-'
        });
        
        iterations.push({
            iteration: 1,
            x_prev,
            x_curr,
            fx_prev,
            fx_curr,
            error
        });
        
        // Perform iterations
        for (let i = 2; i <= maxIterations; i++) {
            // Check if denominator is too close to zero
            if (Math.abs(fx_curr - fx_prev) < 1e-10) {
                throw new Error('Division by near-zero value');
            }
            
            // Calculate next x
            const x_next = x_curr - fx_curr * (x_curr - x_prev) / (fx_curr - fx_prev);
            const fx_next = this.parser.evaluate(x_next);
            
            // Calculate error
            error = Math.abs(x_next - x_curr);
            
            // Add to iterations
            iterations.push({
                iteration: i,
                x_prev: x_curr,
                x_curr: x_next,
                fx_prev: fx_curr,
                fx_curr: fx_next,
                error
            });
            
            // Update values
            x_prev = x_curr;
            x_curr = x_next;
            fx_prev = fx_curr;
            fx_curr = fx_next;
            
            // Check for convergence
            if (Math.abs(fx_curr) < tolerance || error < tolerance) {
                return {
                    root: x_curr,
                    functionValue: fx_curr,
                    iterations,
                    error,
                    converged: true
                };
            }
        }
        
        // Return result if maximum iterations reached
        return {
            root: x_curr,
            functionValue: fx_curr,
            iterations,
            error,
            converged: false
        };
    }
}