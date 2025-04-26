//main application file
// Initialize the plotter
const plotter = new Plotter('functionGraph');

// DOM element references
const methodSelect = document.getElementById('method');
const methodInputs = document.querySelectorAll('.method-input');
const calculateButton = document.getElementById('calculate');
const iterationsTable = document.getElementById('iterations-table');
const iterationsBody = document.getElementById('iterations-body');
const iterationsHeader = document.getElementById('iterations-header');
const rootValue = document.getElementById('root-value');
const rootFunctionValue = document.getElementById('root-function-value');
const iterationsCount = document.getElementById('iterations-count');
const finalError = document.getElementById('final-error');

// Event listeners
methodSelect.addEventListener('change', handleMethodChange);
calculateButton.addEventListener('click', calculateRoot);

// Show initial method inputs
handleMethodChange();

/**
 * Handle method selection change
 */
function handleMethodChange() {
    const selectedMethod = methodSelect.value;
    
    // Hide all method inputs
    methodInputs.forEach(input => {
        input.classList.remove('active');
    });
    
    // Show selected method inputs
    document.getElementById(`${selectedMethod}-inputs`).classList.add('active');
}

/**
 * Format a number for display
 * @param {number} value - The value to format
 * @param {number} precision - The precision for formatting
 * @returns {string} - The formatted number
 */
function formatNumber(value, precision = 6) {
    return Number.isFinite(value) ? value.toFixed(precision) : value.toString();
}

/**
 * Calculate the root using the selected method
 */
function calculateRoot() {
    try {
        // Get equation and create parser
        const equationInput = document.getElementById('equation').value;
        if (!equationInput.trim()) {
            throw new Error('Please enter an equation');
        }
        
        const parser = new EquationParser(equationInput);
        const methods = new NumericalMethods(parser);
        
        // Get selected method
        const selectedMethod = methodSelect.value;
        
        // Get common parameters
        const tolerance = parseFloat(document.getElementById('tolerance').value);
        const maxIterations = parseInt(document.getElementById('max-iterations').value);
        
        let result;
        let plotStart, plotEnd;
        
        // Execute the selected method
        switch (selectedMethod) {
            case 'bisection':
                const a = parseFloat(document.getElementById('a').value);
                const b = parseFloat(document.getElementById('b').value);
                
                if (a >= b) {
                    throw new Error('Lower bound must be less than upper bound');
                }
                
                result = methods.bisection(a, b, tolerance, maxIterations);
                plotStart = a - Math.abs(a) * 0.5;
                plotEnd = b + Math.abs(b) * 0.5;
                break;
                
            case 'newton':
                const x0 = parseFloat(document.getElementById('x0').value);
                
                result = methods.newtonRaphson(x0, tolerance, maxIterations);
                // Determine plot range around the root
                plotStart = result.root - 5;
                plotEnd = result.root + 5;
                break;
                
            case 'secant':
                const x0Secant = parseFloat(document.getElementById('x0-secant').value);
                const x1Secant = parseFloat(document.getElementById('x1-secant').value);
                
                if (x0Secant === x1Secant) {
                    throw new Error('Initial guesses must be different');
                }
                
                result = methods.secant(x0Secant, x1Secant, tolerance, maxIterations);
                // Determine plot range around the root
                plotStart = Math.min(x0Secant, x1Secant, result.root) - 2;
                plotEnd = Math.max(x0Secant, x1Secant, result.root) + 2;
                break;
                
            default:
                throw new Error('Invalid method selected');
        }
        
        // Display results
        displayResults(result, selectedMethod);
        
        // Plot the function and root
        const plotData = parser.getPlotData(plotStart, plotEnd, 200);
        plotter.plot(plotData, { x: result.root, y: result.functionValue });
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

/**
 * Display the results in the UI
 * @param {Object} result - The calculation result
 * @param {string} method - The selected method
 */
function displayResults(result, method) {
    // Display root information
    rootValue.textContent = formatNumber(result.root);
    rootFunctionValue.textContent = formatNumber(result.functionValue);
    rootValue.textContent = formatNumber(result.root);
    rootFunctionValue.textContent = formatNumber(result.functionValue);
    iterationsCount.textContent = result.iterations.length - 1;
    finalError.textContent = formatNumber(result.error);
    
    // Clear previous iterations
    iterationsBody.innerHTML = '';
    
    // Setup header row based on method
    setupIterationTableHeader(method);
    
    // Add iteration rows
    result.iterations.forEach(iteration => {
        const row = document.createElement('tr');
        
        // Add cells based on method
        switch (method) {
            case 'bisection':
                row.innerHTML = `
                    <td>${iteration.iteration}</td>
                    <td>${formatNumber(iteration.a)}</td>
                    <td>${formatNumber(iteration.b)}</td>
                    <td>${iteration.c !== '-' ? formatNumber(iteration.c) : '-'}</td>
                    <td>${formatNumber(iteration.fa)}</td>
                    <td>${formatNumber(iteration.fb)}</td>
                    <td>${iteration.fc !== '-' ? formatNumber(iteration.fc) : '-'}</td>
                    <td>${iteration.error !== '-' ? formatNumber(iteration.error) : '-'}</td>
                `;
                break;
                
            case 'newton':
                row.innerHTML = `
                    <td>${iteration.iteration}</td>
                    <td>${formatNumber(iteration.x)}</td>
                    <td>${formatNumber(iteration.fx)}</td>
                    <td>${iteration.derivative !== '-' ? formatNumber(iteration.derivative) : '-'}</td>
                    <td>${iteration.error !== '-' ? formatNumber(iteration.error) : '-'}</td>
                `;
                break;
                
            case 'secant':
                row.innerHTML = `
                    <td>${iteration.iteration}</td>
                    <td>${formatNumber(iteration.x_prev)}</td>
                    <td>${iteration.x_curr !== '-' ? formatNumber(iteration.x_curr) : '-'}</td>
                    <td>${formatNumber(iteration.fx_prev)}</td>
                    <td>${iteration.fx_curr !== '-' ? formatNumber(iteration.fx_curr) : '-'}</td>
                    <td>${iteration.error !== '-' ? formatNumber(iteration.error) : '-'}</td>
                `;
                break;
        }
        
        iterationsBody.appendChild(row);
    });
}

/**
 * Setup the iteration table header based on the method
 * @param {string} method - The selected method
 */
function setupIterationTableHeader(method) {
    // Clear previous header
    iterationsHeader.innerHTML = '';
    
    // Create iteration number column
    const iterationCell = document.createElement('th');
    iterationCell.textContent = 'Iteration';
    iterationsHeader.appendChild(iterationCell);
    
    // Add columns based on method
    switch (method) {
        case 'bisection':
            iterationsHeader.innerHTML += `
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>f(a)</th>
                <th>f(b)</th>
                <th>f(c)</th>
                <th>Error</th>
            `;
            break;
            
        case 'newton':
            iterationsHeader.innerHTML += `
                <th>x</th>
                <th>f(x)</th>
                <th>f'(x)</th>
                <th>Error</th>
            `;
            break;
            
        case 'secant':
            iterationsHeader.innerHTML += `
                <th>x₀</th>
                <th>x₁</th>
                <th>f(x₀)</th>
                <th>f(x₁)</th>
                <th>Error</th>
            `;
            break;
    }
}