import { reversArr } from '../app/src/js/main';

test('array must be reversed', () => {
  expect(reversArr([1, 2, 3])).toStrictEqual([3, 2, 1]);
})