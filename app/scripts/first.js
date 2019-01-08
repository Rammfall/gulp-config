//First file

function firstFunc(first, second) {
  alert(first);
  console.log(second);
}

function secondFunc(third) {
  console.log(third);
}

function main () {
  firstFunc('first', 'second');

  return () => {
    secondFunc('third');
  }
}

let variable = main();

if (variable === undefined) {
  console.log(true);
}