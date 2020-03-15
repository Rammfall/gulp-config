import 'webp-in-css/polyfill';

export const reversArr = arr => arr.reverse();

document.addEventListener('DOMContentLoaded', () => {
  const reversedArr = reversArr([1,2,3]); 
});
