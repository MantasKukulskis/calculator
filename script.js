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

function tokenize(expr) {
  const tokens = [];
  let numBuffer = '';

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if ('0123456789.'.includes(char)) {
      numBuffer += char;
    } else if ('+-*/'.includes(char)) {
      if (numBuffer) {
        tokens.push(numBuffer);
        numBuffer = '';
      }
      tokens.push(char);
    } else {
    }
  }

  if (numBuffer) {
    tokens.push(numBuffer);
  }

  return tokens;
}

function computeExpression(expr) {
  const tokens = tokenize(expr);
  if (!tokens || tokens.length === 0) throw new Error('Invalid expression');

  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const operator = tokens[i];
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);

      if (isNaN(left) || isNaN(right)) throw new Error('Invalid number');

      const result = operator === '*' ? left * right : left / right;
      tokens.splice(i - 1, 3, result.toString());
      i = 0;
    } else {
      i++;
    }
  }

  i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '+' || tokens[i] === '-') {
      const operator = tokens[i];
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);

      if (isNaN(left) || isNaN(right)) throw new Error('Invalid number');

      const result = operator === '+' ? left + right : left - right;
      tokens.splice(i - 1, 3, result.toString());
      i = 0;
    } else {
      i++;
    }
  }

  return tokens[0];
}

document.addEventListener('keydown', function (event) {
  const key = event.key;

  if ('0123456789+-*/.'.includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    clearDisplay();
  }
});