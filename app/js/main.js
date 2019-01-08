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
//second file

alert('second');

console.log( () => {
  let someVar = 'hey';

  return someVar;
} );
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpcnN0LmpzIiwic2Vjb25kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRmlyc3QgZmlsZVxyXG5cclxuZnVuY3Rpb24gZmlyc3RGdW5jKGZpcnN0LCBzZWNvbmQpIHtcclxuICBhbGVydChmaXJzdCk7XHJcbiAgY29uc29sZS5sb2coc2Vjb25kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Vjb25kRnVuYyh0aGlyZCkge1xyXG4gIGNvbnNvbGUubG9nKHRoaXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpbiAoKSB7XHJcbiAgZmlyc3RGdW5jKCdmaXJzdCcsICdzZWNvbmQnKTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIHNlY29uZEZ1bmMoJ3RoaXJkJyk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgdmFyaWFibGUgPSBtYWluKCk7XHJcblxyXG5pZiAodmFyaWFibGUgPT09IHVuZGVmaW5lZCkge1xyXG4gIGNvbnNvbGUubG9nKHRydWUpO1xyXG59IiwiLy9zZWNvbmQgZmlsZVxyXG5cclxuYWxlcnQoJ3NlY29uZCcpO1xyXG5cclxuY29uc29sZS5sb2coICgpID0+IHtcclxuICBsZXQgc29tZVZhciA9ICdoZXknO1xyXG5cclxuICByZXR1cm4gc29tZVZhcjtcclxufSApOyJdfQ==
