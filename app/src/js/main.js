const arr = [1, 2];

const bbb = [...arr];

const obj = {
  aaa: '1',
  bbb: '2'
};

const objNew = {
  aaa: 'new 1',
  ccc: '3'
};

const lll = {
  ...obj,
  ...objNew
};

console.log(lll);

console.log(bbb);
console.log('tes s d t  sd sd sda a s da');
