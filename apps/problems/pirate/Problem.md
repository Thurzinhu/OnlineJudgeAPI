# Pirata Barba Ruiva - Posição do pirata

## Descrição

Em *Pirata Barba Ruiva*, O pirata Barba Ruiva encontrou um mapa que leva a um tesouro escondido em uma ilha deserta. No mapa, há uma sequência de números que representam a quantidade de passos que ele deve dar em cada direção (norte, sul, leste, oeste). Sua tarefa é ajudar Barba Ruiva a calcular sua posição final após seguir todas as instruções do mapa.

Onde cada número representa um movimento do pirata:

- Cada número positivo representa passos para o norte.

- Cada número negativo representa passos para o sul.

- Cada número par representa passos para o leste.

- Cada número ímpar (exceto os negativos) representa passos para o oeste.

## Entrada

- Na primeira linha um inteiro n que representa o tamanho da lista de passos.

- em sequencia uma lista de números inteiros representando os passos, separados por um espaço.

## Saída

A posição final de Barba Ruiva no formato (x, y), onde x é a coordenada leste-oeste e y é a coordenada norte-sul.

## Exemplo

### Exemplo 1

**Entrada:**  
```
[5, -3, 2, 7, -4];  
```
**Saída:**  
```
(-6, 7);  
```

**Explicação**

+ 5 (positivo e impar): 
    - Norte → y += 5
    - Oeste → x -= 5

+ -3 (negativo): 
    - Sul → y -= 3

+ 2 (positivo e par): 
    - Leste → x += 2
    - Norte → y += 2

+ 7 (positivo e ímpar): 
    - Oeste → x -= 7
    - Norte → y += 7

+ -4 (negativo e par): 
    - Sul → y -= 4
    - Leste → x += 4


### Exemplo 2

**Entrada:**  
```
[10, 4, -6, 3, -1];  
```
**Saída:**  
```
(17, 10);  
```

**Explicação**

+ 10 (positivo e par):
    - Norte → y += 10
    - Leste → x += 10

+ 4 (positivo e par):
    - Norte → y += 4
    - Leste → x += 4

+ -6 (negativo e par):
    - Sul → y -= 6
    - Leste → x += 6

+ 3 (positivo e ímpar):
    - Norte → y += 3
    - Oeste → x -= 3

+ -1 (negativo e ímpar):
    - Sul → y -= 1

## Restrições

- `1 <= lista.lenght <= 100`
- `-10^4 <= lista[i] <= 10^4`

