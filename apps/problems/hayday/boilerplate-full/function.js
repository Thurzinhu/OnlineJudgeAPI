##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
const size_estoque = parseInt(input.shift());
const estoque = input.splice(0, size_estoque).map(Number);
const size_pedido = parseInt(input.shift());
const pedido = input.splice(0, size_pedido);
const result = hayDay(estoque, pedido);
console.log(result);