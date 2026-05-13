type DisplayProps = {
  value: string;
  expression?: string;
};

export function Display({ value, expression }: DisplayProps) {
  return (
    <div
      className="calculator-display"
      aria-atomic="true"
      aria-label="Calculator display"
      aria-live="polite"
      role="status"
    >
      {expression ? (
        <div className="calculator-display__expression" aria-label={`Expression: ${expression}`}>
          {expression}
        </div>
      ) : null}
      <div className="calculator-display__value" aria-label={`Current value: ${value}`}>
        {value}
      </div>
    </div>
  );
}
