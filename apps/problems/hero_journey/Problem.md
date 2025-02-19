# A Jornada do Herói

## Descrição

Em um reino distante, um herói está em uma missão para derrotar um dragão que está assustando a vila. Para chegar ao covil do dragão, o herói precisa atravessar uma floresta cheia de monstros. Cada monstro tem um nível de poder, e o herói só pode derrotar monstros com nível de poder menor ou igual ao seu. O herói começa com um nível de poder inicial e, ao derrotar um monstro, ganha pontos de experiência que aumentam seu nível de poder.

Dada uma lista de monstros com seus níveis de poder e o nível de poder inicial do herói, determine se o herói conseguirá chegar ao covil do dragão.

## Entrada

- A primeira linha contém dois inteiros: N (número de monstros) e P (nível de poder inicial do herói).
- A segunda linha contém N inteiros, representando o nível de poder de cada monstro.

## Saída

- Imprima "Sim" se o herói conseguir derrotar todos os monstros e chegar ao covil do dragão. Caso contrário, imprima "Não".

## Exemplo 1

**Entrada**
```
5 10
8 12 7 10 9
```

**Saída**
```
Não
```

## Restrições

- `1 <= N <= 10^5`
- `1 <= P <= 10^6`
- `1 <= nível de cada monstro <= 10^6`

