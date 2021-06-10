const {sum, power} = require("./sum_difference");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("raises 2 to the power of 4", () => {
  expect(power(2, 4)).toBe(16);
});
