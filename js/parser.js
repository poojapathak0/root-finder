// parser.js
function parseEquation(eqStr) {
    // Replace ^ with ** for JS exponentiation
    eqStr = eqStr.replace(/\^/g, "**");
    
    return function(x) {
      try {
        return eval(eqStr);
      } catch (e) {
        alert("Invalid Equation!");
        throw e;
      }
    }
  }
  