##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
const size_sequencia = parseInt(input.shift());
const sequencia = input.splice(0, size_sequencia).map(Number);
const result = encontrarNumeroPerdido(sequencia);
console.log(result);