export const objectToArray = (object, nameKey = "_id") => {
  const objectArr = [];
  for (const key in object) {
    const newObject = { ...object[key], [nameKey]: key };
    if (Object.prototype.hasOwnProperty.call(object, key))
      objectArr.push(newObject);
  }
  return objectArr;
};

export const searchString = (str, search) => {
  return str.trim().toLowerCase().indexOf(search.trim().toLowerCase()) !== -1;
};
