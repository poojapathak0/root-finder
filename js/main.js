// main.js
document.getElementById('method').addEventListener('change', showAdditionalInputs);
document.getElementById('solve-btn').addEventListener('click', solveEquation);

function showAdditionalInputs() {
  const method = document.getElementById('method').value;
  const container = document.getElementById('additional-inputs');
  container.innerHTML = '';

  if (method === 'bisection' || method === 'secant') {
    container.innerHTML = `
      <label>Lower bound (a):</label>
      <input type="number" id="a" placeholder="Enter a">

      <label>Upper bound (b):</label>
      <input type="number" id="b" placeholder="Enter b">
    `;
  } else if (method === 'newton') {
    container.innerHTML = `
      <label>Initial guess (x₀):</label>
      <input type="number" id="x0" placeholder="Enter x₀">
    `;
  }
}

function solveEquation() {
  const eqStr = document.getElementById('equation').value;
  const method = document.getElementById('method').value;
  const f = parseEquation(eqStr);
  
  let iterations = [];
  
  if (method === 'bisection') {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    iterations = Methods.bisection(f, a, b);
  } else if (method === 'newton') {
    const x0 = parseFloat(document.getElementById('x0').value);
    iterations = Methods.newton(f, x0);
  } else if (method === 'secant') {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    iterations = Methods.secant(f, a, b);
  }

  updateTable(iterations);
  if (iterations.length > 0) {
    plotFunction(f, iterations[iterations.length - 1].x);
  }
}

function updateTable(iterations) {
  const tbody = document.querySelector('#iteration-table tbody');
  tbody.innerHTML = '';

  iterations.forEach(iter => {
    const row = `
      <tr>
        <td>${iter.step}</td>
        <td>${iter.x.toFixed(6)}</td>
        <td>${iter.fx.toExponential(3)}</td>
        <td>${iter.error.toExponential(3)}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
