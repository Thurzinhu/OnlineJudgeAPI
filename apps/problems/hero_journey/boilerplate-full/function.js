##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
const n = parseInt(input.shift());
const p = parseInt(input.shift());
const size_poder = parseInt(input.shift());
const poder = input.splice(0, size_poder).map(Number);
const result = jornadaDoHeroi(n, p, poder);
console.log(result);