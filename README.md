# root-finder
# Interactive Numerical Root Finder

A web-based application for finding roots of equations using various numerical methods.

## Overview

This application allows users to find the roots of mathematical equations using three common numerical methods:

1. **Bisection Method**: A simple method that repeatedly bisects an interval and selects the subinterval where the root lies.
2. **Newton-Raphson Method**: An iterative method that uses function derivatives to find successively better approximations.
3. **Secant Method**: Similar to Newton-Raphson but uses two points instead of a derivative.

## Features

- **Equation Input**: Users can input mathematical equations using standard notation.
- **Method Selection**: Choose between Bisection, Newton-Raphson, and Secant methods.
- **Interactive Parameters**: Set initial values, tolerance, and maximum iterations.
- **Visual Representation**: See the function graph and root location.
- **Iteration Steps**: View detailed steps of the numerical process.
- **Error Analysis**: Track the error at each iteration.

## How to Use

1. **Enter an Equation**: Input your equation in the text field (e.g., `x^2-4` or `sin(x)-0.5`).
2. **Select a Method**: Choose your preferred numerical method.
3. **Set Parameters**:
   - For Bisection: Enter lower bound (a) and upper bound (b).
   - For Newton-Raphson: Enter initial guess (x₀).
   - For Secant: Enter first guess (x₀) and second guess (x₁).
4. **Adjust Options**: Set error tolerance and maximum iterations if needed.
5. **Calculate**: Click the "Find Root" button to perform the calculation.
6. **View Results**: Examine the root value, function value at the root, and iteration steps.

## Mathematical Functions and Syntax

The application supports a wide range of mathematical functions and operators:

- Basic operators: `+`, `-`, `*`, `/`, `^` (power)
- Trigonometric functions: `sin()`, `cos()`, `tan()`, etc.
- Exponential and logarithmic: `exp()`, `log()`, `ln()`
- Constants: `pi`, `e`

Examples of valid equations:
- `x^2-4`
- `sin(x)-0.5`
- `exp(x)-2*x-1`
- `x^3-2*x^2+4*x-8`

## Technical Details

This application uses:
- HTML/CSS for the user interface
- JavaScript for the numerical algorithms
- Chart.js for plotting functions
- Math.js for parsing and evaluating mathematical expressions

## Future Enhancements

Potential features for future development:
- Additional numerical methods (Fixed-Point Iteration, False Position)
- Method comparison mode
- Export results to CSV
- Advanced error analysis
- Multiple root finding