import type { CalculatorOperator } from "../types/calculator";

function roundResult(value: number) {
  return Number(value.toPrecision(12));
}

export function calculate(firstValue: number, secondValue: number, operator: CalculatorOperator) {
  switch (operator) {
    case "+":
      return roundResult(firstValue + secondValue);
    case "-":
      return roundResult(firstValue - secondValue);
    case "*":
      return roundResult(firstValue * secondValue);
    case "/":
      return secondValue === 0 ? null : roundResult(firstValue / secondValue);
    default:
      return secondValue;
  }
}
