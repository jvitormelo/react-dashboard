const toFixed = (value: number): number => Math.round(value * 100) / 100;

const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;

  const sum = numbers.reduce((acc, number) => acc + number, 0);

  return toFixed(sum / numbers.length);
};

export const numberUtils = {
  calculateAverage,
  toFixed,
};
