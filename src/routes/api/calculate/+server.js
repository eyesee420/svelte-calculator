import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  // Get input data from the request body
  const { input } = await request.json();
  
  // Initialize variables
  let result = 0;
  
  // Split input into parts based on operators (+, -, *, /, %), and remove empty parts
  const parts = input.split(/([+\-*\/%])/).filter(part => part.trim() !== '');
  
  // Handle case where no parts are found
  if (parts.length === 0) {
    return json({ error: 'Invalid input' }, { status: 400 });
  }
  
  // Initialize stacks for operators and operands
  const operators = [];
  const operands = [];
  
  // Define precedence of operators
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };
  
  // Function to apply an operation on operands using an operator
  function applyOperation() {
    const operator = operators.pop();
    const operand2 = operands.pop();
    const operand1 = operands.pop();
  
    switch (operator) {
      case '+':
        operands.push(operand1 + operand2);
        break;
      case '-':
        operands.push(operand1 - operand2);
        break;
      case '*':
        operands.push(operand1 * operand2);
        break;
      case '/':
        operands.push(operand1 / operand2);
        break;
    }
  }
  
  // Process each part of the input
  for (const part of parts) {
    if (['+', '-', '*', '/', '%'].includes(part)) {
      // Process operators
      while (
        operators.length > 0 &&
        precedence[operators[operators.length - 1]] >= precedence[part]
      ) {
        applyOperation();
      }
      operators.push(part);
    } else {
      // Process numbers
      const number = parseFloat(part);
      if (!isNaN(number)) {
        operands.push(number);
      } else {
        return json({ error: 'Invalid input' }, { status: 400 });
      }
    }
  }
  
  // Apply remaining operations in the stack
  while (operators.length > 0) {
    applyOperation();
  }
  
  // The final result is the value left in the operands stack
  result = operands[0];

  // Return the result as JSON response
  return json(result);
}