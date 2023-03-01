const toFixed = (value: number): number => Math.round(value * 100) / 100;

export const calculateAverage = (numbers: number[]): number => {
  const sum = numbers.reduce((acc, number) => acc + number, 0);

  return toFixed(sum / numbers.length);
};
