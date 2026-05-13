const MAX_DISPLAY_LENGTH = 12;

export function formatDisplay(value: number | string) {
  if (typeof value === "string") {
    return value;
  }

  if (!Number.isFinite(value)) {
    return "Error";
  }

  const plainValue = String(value);

  if (plainValue.length <= MAX_DISPLAY_LENGTH) {
    return plainValue;
  }

  return value.toExponential(6);
}
