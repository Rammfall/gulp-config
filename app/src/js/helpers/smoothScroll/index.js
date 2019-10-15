export default function scrollToBlock(elem) {
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': elem.offsetTop
  });
}
