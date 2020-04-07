const isObject = obj => typeof obj === 'object' && !Array.isArray(obj);
/**
 * Merges recursively 2 objects prioritizing the injector values in case of overlapping
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
 * Merges recursively 2 objects prioritizing the injector values in case of overlapping
 * @typedef {Function} DeepSpread
 * @param {object} Injected - The object to be injected
 * @param {number} x - The X Coordinate
 * @param {number} y - The Y Coordinate
 */
/**
 * Merges recursively 2 objects prioritizing the injector values in case of overlapping
 * @typedef {object} InjectTo
 * @property {DeepSpread} to - Indicates the object to be injected
 */
/**
 * Merges recursively 2 objects prioritizing the injector values in case of overlapping
 * @param {object} Injector - The object that injects 'injected'
 * @returns {InjectTo} Object with function 'to'
 */
const inject = Injector => {
  /**
   * Merges recursively 2 objects prioritizing the injector values in case of overlapping
   * @param {object} Injected - The object to be injected
   * @returns {object} The result of the deep spread
   */
  const to = Injected => deepSpread(Injector, Injected);
  return { to };
};

/**
 * Merges recursively N objects prioritizing the injector values in case of overlapping
 * @param {object} Injector - The object that injects 'injected'
 * @returns {InjectTo} Object with function 'to'
 */
const injectN = Injector => {
  /**
   * Merges recursively N objects prioritizing the injector values in case of overlapping
   * @param {object} Injected - The object to be injected
   */
  const to = (newInjector = Injector) => Injected => {
    /**
     * @type {object} The result of the deep spread
     */
    result = deepSpread(newInjector, Injected);
    return { result, to: to(result) }
  }
  return { result: Injector, to: to() };
}
module.exports = { deepSpread, inject, injectN };
