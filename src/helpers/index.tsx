/**
 * Find max value in object
 * @param object
 * @returns
 */
export function getMaxProperty(object: Object): string {
  const keys = Object.keys(object);

  let max = {
    value: 0 as number,
    key: "" as string,
  };

  for (let i = 0; i < keys.length; i++) {
    if (max.value < object[keys[i]]) {
      max.value = object[keys[i]];
      max.key = keys[i];
    }
  }

  return max.key;
}
