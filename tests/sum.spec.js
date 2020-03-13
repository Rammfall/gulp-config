

import {expect} from 'chai';
import sum from '../app/src/js/sum.js';
describe('src/sum.js', _ => {
  it('should add 1 + 1 to make two', () => {
    let result = sum(1,1);
    expect(result).to.equal(2);
  })
})
