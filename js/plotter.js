// js/plotter.js

let currentChart = null; // Keep reference to the chart so we can destroy old ones

function plotFunction(f, root = null) {
    const ctx = document.getElementById('graph').getContext('2d');

    // Destroy the previous chart (if it exists)
    if (currentChart !== null) {
        currentChart.destroy();
    }

    const xValues = [];
    const yValues = [];

    for (let x = -10; x <= 10; x += 0.1) {
        try {
            xValues.push(x);
            yValues.push(f(x));
        } catch (err) {
            xValues.push(x);
            yValues.push(null); // to skip plotting if error occurs
        }
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'f(x)',
                data: xValues.map((x, i) => ({ x, y: yValues[i] })),
                borderColor: 'blue',
                fill: false,
                tension: 0.1,
            }
        ]
    };

    // Add root point if available
    if (root !== null) {
        data.datasets.push({
            label: 'Root',
            data: [{ x: root, y: 0 }],
            pointBackgroundColor: 'red',
            pointBorderColor: 'darkred',
            pointRadius: 6,
            showLine: false,
            type: 'scatter',
        });
    }

    currentChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'x',
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'f(x)',
                    }
                }
            }
        }
    });
}
