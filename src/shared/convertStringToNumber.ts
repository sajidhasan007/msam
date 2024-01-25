/* eslint-disable no-prototype-builtins */
type MyObject = {
  [key: string]: string | number;
};

export const convertKeysToNumber = (
  obj: MyObject,
  keysToConvert: string[]
): MyObject => {
  const result: MyObject = { ...obj };

  keysToConvert.forEach(key => {
    if (result.hasOwnProperty(key)) {
      result[key] = Number(result[key]);
    }
  });

  return result;
};
