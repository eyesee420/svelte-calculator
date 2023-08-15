import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  // Parse the JSON input from the request body
  const { input } = await request.json();
  let result = 0;

  // Split the input into numbers and operators using regular expression
  const parts = input.split(/([+\-*\/%])/).filter(part => part.trim() !== '');

  // Handle cases where there's no input or invalid input
  if (parts.length === 0) {
    return json({ error: 'Invalid input' }, { status: 400 });
  }

  let currentOperator = '+'; // Default operator is addition

  // Iterate through each part (number or operator) in the input
  for (const part of parts) {
    if (['+', '-', '*', '/', '%'].includes(part)) {
      currentOperator = part; // Update the current operator if an operator is encountered
    } else {
      const number = parseFloat(part);
      if (!isNaN(number)) {
        // Perform the appropriate operation based on the current operator
        if (currentOperator === '+') {
          result += number;
        } else if (currentOperator === '-') {
          result -= number;
        } else if (currentOperator === '*') {
          result *= number;
        } else if (currentOperator === '/') {
          result /= number;
        } else if (currentOperator === '%') {
          result %= number; // Perform modulo operation
        }
      } else {
        return json({ error: 'Invalid input' }, { status: 400 });
      }
    }
  }

  // Return the calculated result
  return json(result);
}

