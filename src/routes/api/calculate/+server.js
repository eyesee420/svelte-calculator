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
  // Pop the operator from the operators stack
  const operator = operators.pop();
  // Pop the second operand from the operands stack
  const operand2 = operands.pop();
  // Pop the first operand from the operands stack
  const operand1 = operands.pop();
  
  // Perform the appropriate operation based on the operator
  switch (operator) {
    case '+':
      operands.push(operand1 + operand2); // Add the operands
      break;
    case '-':
      operands.push(operand1 - operand2); // Subtract the operands
      break;
    case '*':
      operands.push(operand1 * operand2); // Multiply the operands
      break;
    case '/':
      operands.push(operand1 / operand2); // Divide the operands
      break;
    case '%':
      operands.push(operand1 % operand2); // Modulus operation on the operands
      break;
  }
}

  
  
// Loop through each element in the 'parts' array
for (const part of parts) {
  // Check if the current part is one of the supported operators
  if (['+', '-', '*', '/', '%'].includes(part)) {
    
    // Process operators
    // Continue applying operations as long as there are operators in the stack
    // and the precedence of the operator at the top of the stack is greater
    // than or equal to the precedence of the current operator 
    while (
      operators.length > 0 &&
      precedence[operators[operators.length - 1]] >= precedence[part]
    ) {
      applyOperation(); // Apply the operation using operands and operators
    }
    // Push the current operator onto the stack
    operators.push(part);
  } else {
    // Process numbers
    // Convert the current part to a floating-point number
    const number = parseFloat(part);
    // Check if the conversion was successful (not NaN)
    if (!isNaN(number)) {
      operands.push(number); // Push the valid number into the operands stack
    } else {
      // Return an error response if the part is not a valid number
      const error = 'Invalid input' 
      return json( error);
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