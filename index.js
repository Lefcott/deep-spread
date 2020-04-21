const isObject = obj => typeof obj === 'object' && !Array.isArray(obj);
const escapeChar = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
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
};

const getValue = (obj, search) => {
  search = search.split('.');
  for (let k = 0; k < search.length; k += 1)
    if ([null, undefined].includes(obj)) return undefined;
    else obj = obj[search[k]]
  return obj;
};

/**
 * Deep replace of "values" in "Objects"
 * @param {object} values - Object where keys are searchs and values are values to replace
 * @param {string} borders - String of length 2 indicating the start and end of search
 * @param {number} borderRepeat - Number of border repeats
 */
const replace = (values = {}, borders = '{}', borderRepeat = 2) => ({
  /**
   * Replaces values en each object
   * @param {object} Objects - Destination objects
   * @returns {array}
   */
  in: (...Objects) => {
    const b1 = escapeChar(borders[0] || '').repeat(borderRepeat);
    const b2 = escapeChar(borders[1] || '').repeat(borderRepeat);
    const result = [];
    for (let k = 0; k < Objects.length; k += 1) {
      const obj = { ...Objects[k] };
      const keys = Object.keys(obj);
      for (let m = 0; m < keys.length; m += 1) {
        const key = keys[m];
        if (isObject(obj[key])) [obj[key]] = replace(values, borders, borderRepeat).in(obj[key]);
        else if (typeof obj[key] === 'string') {
          obj[key] = obj[key].replace(new RegExp(`${b1}[^${b1}]*${b2}`, 'g'), match => {
            const nestedKey = match.replace(new RegExp(`${b1} *| *${b2}`, 'g'), '');
            return getValue(values, nestedKey);
          });
        }
      }
      result.push(obj);
    }
    return result;
  }
});

module.exports = { deepSpread, inject, injectN, replace };
