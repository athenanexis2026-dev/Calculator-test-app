import type { CalculatorButtonVariant } from "../types/calculator";

export type CalculatorButtonConfig = {
  label: string;
  value: string;
  variant: CalculatorButtonVariant;
  ariaLabel: string;
  className?: string;
};

export const calculatorButtons: CalculatorButtonConfig[] = [
  { label: "C", value: "clear", variant: "utility", ariaLabel: "Clear calculator" },
  { label: "DEL", value: "delete", variant: "utility", ariaLabel: "Delete last digit" },
  { label: "%", value: "percent", variant: "utility", ariaLabel: "Percentage" },
  { label: "/", value: "/", variant: "operator", ariaLabel: "Divide" },
  { label: "7", value: "7", variant: "number", ariaLabel: "Seven" },
  { label: "8", value: "8", variant: "number", ariaLabel: "Eight" },
  { label: "9", value: "9", variant: "number", ariaLabel: "Nine" },
  { label: "*", value: "*", variant: "operator", ariaLabel: "Multiply" },
  { label: "4", value: "4", variant: "number", ariaLabel: "Four" },
  { label: "5", value: "5", variant: "number", ariaLabel: "Five" },
  { label: "6", value: "6", variant: "number", ariaLabel: "Six" },
  { label: "-", value: "-", variant: "operator", ariaLabel: "Subtract" },
  { label: "1", value: "1", variant: "number", ariaLabel: "One" },
  { label: "2", value: "2", variant: "number", ariaLabel: "Two" },
  { label: "3", value: "3", variant: "number", ariaLabel: "Three" },
  { label: "+", value: "+", variant: "operator", ariaLabel: "Add" },
  { label: "0", value: "0", variant: "number", ariaLabel: "Zero", className: "calculator-button--wide" },
  { label: ".", value: ".", variant: "number", ariaLabel: "Decimal point" },
  { label: "=", value: "equals", variant: "equal", ariaLabel: "Calculate result" },
];
