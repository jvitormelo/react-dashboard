// TODO - Test
function normalize(str: string) {
  if (!str) return "";

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const stringUtils = {
  normalize,
};
