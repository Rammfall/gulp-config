import $ from 'jquery';
import 'webp-in-css/polyfill';

import FormValid from './validation/index';

window.$ = $;
window.jQuery = $;

document.addEventListener('DOMContentLoaded', () => {
  const form = new FormValid();
  form.init();
});
