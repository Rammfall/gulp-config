console.log('js maasdasdad a dasdin');
let omgwtf = 233221311232123121233321;

let arr = ["name", "sername"]

let [firstName, surname] = arr;

console.log(firstName, surname);

fetch('https://test.com').then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  console.log(objectURL);
});