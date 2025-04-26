// methods.js
const Methods = {
    bisection: function(f, a, b, tolerance = 0.001, maxIter = 100) {
      let iterations = [];
      let mid, error;
  
      for (let i = 0; i < maxIter; i++) {
        mid = (a + b) / 2;
        let fMid = f(mid);
  
        error = Math.abs(fMid);
  
        iterations.push({ step: i + 1, x: mid, fx: fMid, error: error });
  
        if (error < tolerance) break;
  
        if (f(a) * fMid < 0) {
          b = mid;
        } else {
          a = mid;
        }
      }
      return iterations;
    },
  
    newton: function(f, x0, tolerance = 0.001, maxIter = 100) {
      let iterations = [];
      const h = 1e-6;
  
      function derivative(x) {
        return (f(x + h) - f(x - h)) / (2 * h);
      }
  
      let x = x0;
      for (let i = 0; i < maxIter; i++) {
        let fx = f(x);
        let dfx = derivative(x);
  
        if (Math.abs(dfx) < 1e-10) break; // avoid division by 0
  
        let xNew = x - fx / dfx;
        let error = Math.abs(xNew - x);
  
        iterations.push({ step: i + 1, x: xNew, fx: f(xNew), error: error });
  
        if (error < tolerance) break;
  
        x = xNew;
      }
      return iterations;
    },
  
    secant: function(f, x0, x1, tolerance = 0.001, maxIter = 100) {
      let iterations = [];
      let xPrev = x0;
      let xCurr = x1;
  
      for (let i = 0; i < maxIter; i++) {
        let fxPrev = f(xPrev);
        let fxCurr = f(xCurr);
  
        if (Math.abs(fxCurr - fxPrev) < 1e-10) break; // avoid division by 0
  
        let xNew = xCurr - fxCurr * (xCurr - xPrev) / (fxCurr - fxPrev);
        let error = Math.abs(xNew - xCurr);
  
        iterations.push({ step: i + 1, x: xNew, fx: f(xNew), error: error });
  
        if (error < tolerance) break;
  
        xPrev = xCurr;
        xCurr = xNew;
      }
      return iterations;
    }
  };
  