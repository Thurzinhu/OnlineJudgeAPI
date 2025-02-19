# Hayday – Gerenciamento de Pedidos

## Descrição

Em *Hay Day*, os fazendeiros recebem pedidos dos clientes e devem entregá-los para ganhar moedas. Cada pedido contém uma lista de produtos e suas quantidades. Seu objetivo é verificar se a fazenda tem estoque suficiente para atender a um pedido.

Dadas duas arrays de números inteiros, uma representando o **estoque da fazenda** e outra representando um **pedido**, escreva uma função para determinar se o pedido pode ser atendido completamente.

Cada índice das arrays representa um tipo específico de produto, onde:
- Índice `0` → Trigo 🌾
- Índice `1` → Cenoura 🥕
- Índice `2` → Leite 🥛

Se o pedido puder ser atendido, a função deve retornar `"Pedido atendido"`; caso contrário, deve retornar `"Estoque insuficiente"`.

## Exemplo

### Exemplo 1

**Entrada:**  
```js
const estoque = [10, 5, 3];  
const pedido = [5, 2, 3];
```
**Saída:**  
`"Pedido atendido"`

### Exemplo 2

**Entrada:**  
```js
const estoque = [4, 5, 2];  
const pedido = [5, 2, 3];
```
**Saída:**  
`"Estoque insuficiente"`

## Restrições

- `1 <= estoque.length, pedido.length <= 100`
- `1 <= quantidade de cada item <= 10^4`
- Ambas as arrays terão o mesmo tamanho e representam produtos na mesma ordem.