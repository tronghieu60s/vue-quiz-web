export const searchString = (str, search) => {
  return str.trim().toLowerCase().indexOf(search.trim().toLowerCase()) !== -1;
};
