##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
const n = parseInt(input.shift());
const size_passos = parseInt(input.shift());
const passos = input.splice(0, size_passos).map(Number);
const result = posicaoPirata(n, passos);
console.log(result);