//implementation:graphing
/**
 * Class for plotting functions and roots
 */
class Plotter {
    /**
     * Constructor for the plotter
     * @param {string} canvasId - The ID of the canvas element
     */
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.chart = null;
        this.initChart();
    }
    
    /**
     * Initialize the chart with empty data
     */
    initChart() {
        const ctx = document.getElementById(this.canvasId).getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'f(x)',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }, {
                    label: 'Root',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    showLine: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'center',
                        title: {
                            display: true,
                            text: 'x'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'center',
                        title: {
                            display: true,
                            text: 'f(x)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                if (label === 'Root') {
                                    return `Root: (${context.parsed.x.toFixed(6)}, ${context.parsed.y.toFixed(6)})`;
                                }
                                return `${label}: (${context.parsed.x.toFixed(4)}, ${context.parsed.y.toFixed(4)})`;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }
    
    /**
     * Plot the function and root
     * @param {Object} plotData - The data for plotting (x and y arrays)
     * @param {Object} rootData - The root data (x and f(x))
     */
    plot(plotData, rootData = null) {
        // Convert data for Chart.js format
        const functionData = plotData.x.map((x, i) => {
            return { x, y: plotData.y[i] };
        });
        
        // Update function data
        this.chart.data.datasets[0].data = functionData;
        
        // Update root point if provided
        if (rootData) {
            this.chart.data.datasets[1].data = [{ x: rootData.x, y: rootData.y }];
        } else {
            this.chart.data.datasets[1].data = [];
        }
        
        // Set axis limits based on data
        const xValues = plotData.x;
        const yValues = plotData.y.filter(y => y !== null && isFinite(y));
        
        const xMin = Math.min(...xValues);
        const xMax = Math.max(...xValues);
        const yMin = yValues.length ? Math.min(...yValues) : -10;
        const yMax = yValues.length ? Math.max(...yValues) : 10;
        
        // Add padding to the axes
        const xPadding = (xMax - xMin) * 0.1;
        const yPadding = (yMax - yMin) * 0.2;
        
        this.chart.options.scales.x.min = xMin - xPadding;
        this.chart.options.scales.x.max = xMax + xPadding;
        this.chart.options.scales.y.min = yMin - yPadding;
        this.chart.options.scales.y.max = yMax + yPadding;
        
        // Update chart
        this.chart.update();
    }
    
    /**
     * Reset the chart
     */
    reset() {
        this.chart.data.datasets[0].data = [];
        this.chart.data.datasets[1].data = [];
        this.chart.update();
    }
}