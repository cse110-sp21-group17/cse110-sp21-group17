/**
 *
 * @param {int} a First param to add
 * @param {int} b Second param to add
 * @returns {int} The sum
 */
function sum(a, b) {
  return a + b;
}

/**
 *
 * @param {int} a First param to multiply
 * @param {int} b Second param to multiply
 * @returns {int} The product
 */
function mult(a, b) {
  return a * b;
}

/**
 *
 * @param {int} a base in the power operation
 * @param {int} b exponent to raise the base by
 * @returns {int} The result of the power function
 */
function power(a, b) {
  return a ** b;
}

module.exports = { sum, power };
