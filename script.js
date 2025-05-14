function appendValue(value) {
  const display = document.getElementById('display');
  display.value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculate() {
  const input = document.getElementById('display').value;
  try {
    const result = computeExpression(input);
    document.getElementById('display').value = result;
  } catch {
    document.getElementById('display').value = 'Error';
  }
}

// Saugus skaičiavimas
function computeExpression(expr) {
  const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
  if (!tokens) throw 'Invalid';

  let numbers = [];
  let operators = [];

  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  function applyOperator() {
    const b = numbers.pop();
    const a = numbers.pop();
    const op = operators.pop();

    let result;
    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b === 0 ? NaN : a / b; break;
      default: throw 'Unknown operator';
    }
    numbers.push(result);
  }

  for (let token of tokens) {
    if (!isNaN(token)) {
      numbers.push(parseFloat(token));
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        applyOperator();
      }
      operators.push(token);
    } else {
      throw 'Invalid token';
    }
  }

  while (operators.length) {
    applyOperator();
  }

  return numbers[0];
}

// Klaviatūros palaikymas
document.addEventListener('keydown', function (event) {
  const key = event.key;
  const allowed = '0123456789+-*/.';
  if (allowed.includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    clearDisplay();
  }
});