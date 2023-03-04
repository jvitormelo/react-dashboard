const createObjectURL = (file: File) => {
  return URL.createObjectURL(file);
};

export const imageUtils = {
  createObjectURL,
};
