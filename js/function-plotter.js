/**
 * Function Plotter Module
 * Handles the plotting of mathematical functions using function-plot library
 */

// Initialize function plotter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing function plotter...');
    
    const plotFunctionBtn = document.getElementById('plot-function');
    if (plotFunctionBtn) {
        plotFunctionBtn.addEventListener('click', plotFunctionHandler);
    } else {
        console.warn('Plot function button not found');
    }
});

/**
 * Handles the plot function button click event
 */
function plotFunctionHandler() {
    try {
        // Get input values
        const functionInput = document.getElementById('function-input');
        const xMinInput = document.getElementById('x-min');
        const xMaxInput = document.getElementById('x-max');
        const yMinInput = document.getElementById('y-min');
        const yMaxInput = document.getElementById('y-max');
        
        // Validate inputs
        if (!functionInput || !functionInput.value) {
            throw new Error('Please enter a function to plot');
        }
        
        // Parse numeric values with defaults
        const xMin = xMinInput ? parseFloat(xMinInput.value) || -10 : -10;
        const xMax = xMaxInput ? parseFloat(xMaxInput.value) || 10 : 10;
        const yMin = yMinInput ? parseFloat(yMinInput.value) || -10 : -10;
        const yMax = yMaxInput ? parseFloat(yMaxInput.value) || 10 : 10;
        
        // Plot the function
        plotFunction(functionInput.value, xMin, xMax, yMin, yMax);
        
    } catch (error) {
        console.error('Error plotting function:', error);
        const plotContainer = document.getElementById('plot-container');
        if (plotContainer) {
            plotContainer.innerHTML = `<div class="error">${error.message}</div>`;
        }
    }
}

/**
 * Plots a mathematical function using function-plot
 * @param {string} functionStr - The function to plot (e.g., 'x^2')
 * @param {number} xMin - Minimum x-value for the plot
 * @param {number} xMax - Maximum x-value for the plot
 * @param {number} yMin - Minimum y-value for the plot
 * @param {number} yMax - Maximum y-value for the plot
 */
function plotFunction(functionStr, xMin, xMax, yMin, yMax) {
    try {
        const plotContainer = document.getElementById('plot-container');
        if (!plotContainer) {
            throw new Error('Plot container not found');
        }
        
        // Clear previous plot
        plotContainer.innerHTML = '';
        
        // Create new plot
        functionPlot({
            target: plotContainer,
            width: plotContainer.offsetWidth,
            height: 400,
            xAxis: { 
                domain: [xMin, xMax],
                label: 'x'
            },
            yAxis: { 
                domain: [yMin, yMax],
                label: 'y'
            },
            grid: true,
            data: [{
                fn: functionStr,
                color: '#007bff',
                derivative: {
                    fn: math.derivative(functionStr, 'x').toString(),
                    updateOnMouseMove: true
                }
            }],
            tip: {
                xLine: true,
                yLine: true,
                renderer: function(x, y, index) {
                    return `x: ${x.toFixed(2)}\ny: ${y.toFixed(2)}`;
                }
            }
        });
        
    } catch (error) {
        console.error('Function plotting error:', error);
        const plotContainer = document.getElementById('plot-container');
        if (plotContainer) {
            plotContainer.innerHTML = `<div class="error">Error plotting function: ${error.message}</div>`;
        }
        throw error;
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        plotFunction,
        plotFunctionHandler
    };
}
