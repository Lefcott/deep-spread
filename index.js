const isObject = obj => typeof obj === 'object' && !Array.isArray(obj);
/**
 * Merges recursively 2 objects replacing the values of the injector if the value is defined on both objects
 * @param {object} Injected - The object to be injected
 * @param {object} Injector - The object that injects 'injected'
 * @returns {object} The deep-spreaded object
 */
const deepSpread = (Injector, Injected) => {
  const injected = { ...Injected };
  if ([null, undefined].includes(injected)) return Injector;
  const inejctorKeys = Object.keys(Injector);
  for (let k = 0; k < inejctorKeys.length; k += 1) {
    const key = inejctorKeys[k];
    if (isObject(Injector[key]) && isObject(injected[key])) {
      injected[key] = deepSpread(Injector[key], injected[key]);
    } else {
      injected[key] = Injector[key];
    }
  }
  return injected;
};
/**
 * Merges recursively 2 objects replacing the values of the injector if the value is defined on both objects
 * @typedef {Function} DeepSpread
 * @param {object} Injected - The object to be injected
 * @param {number} x - The X Coordinate
 * @param {number} y - The Y Coordinate
 */
/**
 * Merges recursively 2 objects replacing the values of the injector if the value is defined on both objects
 * @typedef {object} InjectTo
 * @property {DeepSpread} to - Indicates the object to be injected
 */
/**
 * Merges recursively 2 objects replacing the values of the injector if the value is defined on both objects
 * @param {object} Injector - The object that injects 'injected'
 * @returns {InjectTo} Object with function 'to'
 */
const inject = Injector => {
  /**
   * Merges recursively 2 objects replacing the values of the injector if the value is defined on both objects
   * @param {object} Injected - The object to be injected
   */
  const to = Injected => deepSpread(Injector, Injected);
  return { to };
};
module.exports = { deepSpread, inject };
