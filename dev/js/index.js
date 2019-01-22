

console.log('asdas asd aasdassd d ', a);
let omgwtf = 2332213121321233321; 

let arr = ["name", "sername"]

let [firstName, surname] = arr;

console.log(firstName, surname);

(function a (a = 'adas', b = 23213, c = undefined) {
 console.log(a);
})();

fetch('https://api.chucknorris.io/jokes/random').then(function(response) {
  console.log('test1')
  return response.json();
}).then(function(myBlob) {
  console.log('test2')
  console.log(myBlob.value);
  0
});


class Test {



  run = () => {
  
    console.log('run')
  }
}

new Test('asda', 'asdas', 'aaa');