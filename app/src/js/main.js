import 'webp-in-css/polyfill';

export const reversArr = arr => arr.reverse();

document.addEventListener('DOMContentLoaded', () => {
  reversArr([1,2,3]); 
});
