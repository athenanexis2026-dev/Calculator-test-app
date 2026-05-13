import { useState } from "react";
import { Button } from "../Button/Button";
import { Display } from "../Display/Display";
import { calculatorButtons } from "../../data/calculatorButtons";
import { calculate } from "../../utils/calculate";
import { formatDisplay } from "../../utils/formatDisplay";
import type { CalculatorButtonVariant, CalculatorOperator } from "../../types/calculator";

const MAX_INPUT_LENGTH = 12;
const DIVIDE_BY_ZERO_ERROR = "Cannot divide by zero";

export function Calculator() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<CalculatorOperator | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const expression =
    previousValue && selectedOperator ? `${previousValue} ${selectedOperator}` : "Ready";

  function isErrorValue(value: string) {
    return value === DIVIDE_BY_ZERO_ERROR || value === "Error";
  }

  function setResultValue(result: number) {
    const formattedResult = formatDisplay(result);
    setCurrentValue(formattedResult);
    return formattedResult;
  }

  function resetCalculator() {
    setCurrentValue("0");
    setPreviousValue(null);
    setSelectedOperator(null);
    setShouldResetDisplay(false);
  }

  function handleNumber(value: string) {
    if (value === ".") {
      handleDecimal();
      return;
    }

    if (isErrorValue(currentValue)) {
      setCurrentValue(value);
      setShouldResetDisplay(false);
      return;
    }

    if (shouldResetDisplay || currentValue === "0") {
      setCurrentValue(value);
      setShouldResetDisplay(false);
      return;
    }

    if (currentValue.replace(".", "").length >= MAX_INPUT_LENGTH) {
      return;
    }

    setCurrentValue(`${currentValue}${value}`);
  }

  function handleDecimal() {
    if (isErrorValue(currentValue) || shouldResetDisplay) {
      setCurrentValue("0.");
      setShouldResetDisplay(false);
      return;
    }

    if (currentValue.includes(".")) {
      return;
    }

    if (currentValue.length >= MAX_INPUT_LENGTH) {
      return;
    }

    setCurrentValue(`${currentValue}.`);
  }

  function handleDelete() {
    if (isErrorValue(currentValue) || shouldResetDisplay || currentValue.length <= 1) {
      setCurrentValue("0");
      setShouldResetDisplay(false);
      return;
    }

    setCurrentValue(currentValue.slice(0, -1));
  }

  function handleOperator(operator: CalculatorOperator) {
    if (isErrorValue(currentValue)) {
      resetCalculator();
      return;
    }

    if (!previousValue) {
      setPreviousValue(currentValue);
      setSelectedOperator(operator);
      setShouldResetDisplay(true);
      return;
    }

    if (selectedOperator && !shouldResetDisplay) {
      const result = calculate(Number(previousValue), Number(currentValue), selectedOperator);

      if (result === null) {
        setCurrentValue(DIVIDE_BY_ZERO_ERROR);
        setPreviousValue(null);
        setSelectedOperator(null);
        setShouldResetDisplay(true);
        return;
      }

      const resultValue = setResultValue(result);
      setPreviousValue(resultValue);
      setSelectedOperator(operator);
      setShouldResetDisplay(true);
      return;
    }

    setSelectedOperator(operator);
    setShouldResetDisplay(true);
  }

  function handleEquals() {
    if (!previousValue || !selectedOperator || shouldResetDisplay || isErrorValue(currentValue)) {
      return;
    }

    const result = calculate(Number(previousValue), Number(currentValue), selectedOperator);

    if (result === null) {
      setCurrentValue(DIVIDE_BY_ZERO_ERROR);
      setPreviousValue(null);
      setSelectedOperator(null);
      setShouldResetDisplay(true);
      return;
    }

    setResultValue(result);
    setPreviousValue(null);
    setSelectedOperator(null);
    setShouldResetDisplay(true);
  }

  function handlePercent() {
    if (isErrorValue(currentValue)) {
      resetCalculator();
      return;
    }

    const percentValue = Number(currentValue) / 100;
    setResultValue(percentValue);
    setShouldResetDisplay(false);
  }

  function handleUtility(value: string) {
    if (value === "clear") {
      resetCalculator();
      return;
    }

    if (value === "delete") {
      handleDelete();
      return;
    }

    if (value === "percent") {
      handlePercent();
    }
  }

  function handleButtonPress(value: string, variant: CalculatorButtonVariant) {
    if (variant === "number") {
      handleNumber(value);
      return;
    }

    if (variant === "operator") {
      handleOperator(value as CalculatorOperator);
      return;
    }

    if (variant === "equal") {
      handleEquals();
      return;
    }

    if (variant === "utility") {
      handleUtility(value);
    }
  }

  return (
    <section className="calculator" aria-labelledby="calculator-title">
      <h1 className="sr-only" id="calculator-title">
        Calculator
      </h1>
      <Display value={currentValue} expression={expression} />

      <div className="calculator__keypad" aria-label="Calculator keypad" role="group">
        {calculatorButtons.map((button) => (
          <Button
            key={button.value}
            aria-label={button.ariaLabel}
            className={button.className}
            onClick={() => handleButtonPress(button.value, button.variant)}
            variant={button.variant}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
