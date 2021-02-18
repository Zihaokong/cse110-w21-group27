/* eslint-disable prettier/prettier */
const num = require('./test_task');

test('adds 1 + 1 to be 2', () => {
  expect(num(1, 1)).toBe(2);
});

const {minus} = require('./main');

test('minus 1 - 1 to be 0', () => {
  expect(minus(1, 1)).toBe(0);
});
