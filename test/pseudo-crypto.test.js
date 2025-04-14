const PseudoCrypto = require('../dist/main.js')

const pseudoCrypto = {
  numeric: new PseudoCrypto('numeric'),
  inline: new PseudoCrypto('inline'),
  wide: new PseudoCrypto('wide'),
  thin: new PseudoCrypto('thin'),
  lowercase: new PseudoCrypto('lowercase'),
  uppercase: new PseudoCrypto('uppercase'),
  alphabetic: new PseudoCrypto('alphabetic'),
  alphanumeric: new PseudoCrypto('alphanumeric')
}

const max = BigInt(Number.MAX_SAFE_INTEGER)

function random(min, max) {
  if (typeof max === 'bigint')
    return randomBigInt(min, max)
  else return randomNumber(min, max)
}
function randomBigInt(min, max) {
  const range = max - min + 1n

  let bits = 0n
  let temporaryRange = range
  while (temporaryRange > 0n) {
    bits++
    temporaryRange >>= 1n
  }

  let addend
  do {
    addend = 0n
    let bitsLeft = bits

    while (bitsLeft > 0n) {
      const bitsToGenerate = bitsLeft > 32n ? 32n : bitsLeft
      const random = Math.random()
      const ceil = Number(2n ** bitsToGenerate)
      const fragment = BigInt(Math.floor(random * ceil))
      addend = (addend << bitsToGenerate) | fragment
      bitsLeft -= bitsToGenerate
    }
  } while (addend >= range)
  return min + addend
}
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function text(i, t, v, n, l) {
  return `i${i}: ${t} hash/unhash for ${v} ${n} and len ${l}`
}

let index = 0
for (const data of [
  { type: 'numeric', cc: 10 },
  { type: 'inline', cc: 13 },
  { type: 'wide', cc: 21 },
  { type: 'thin', cc: 3 },
  { type: 'uppercase', cc: 26 },
  { type: 'lowercase', cc: 26 },
  { type: 'alphabetic', cc: 52 },
  { type: 'alphanumeric', cc: 62 }
]) {
  for (let i = 0; i < 17; i++) {
    for (let l = 1; l < 17; l++) {
      const lim = BigInt(data.cc) ** BigInt(l) - BigInt(1)
      const end = Number(lim <= max ? lim : max)
      const num = random(1, end)
      const int = random(BigInt(1), lim)
      test(text(++index, data.type, 'num', num, l), () => {
        const hash = pseudoCrypto[data.type].hash(num, l)
        expect(pseudoCrypto[data.type].unhash(hash)).toBe(num)
      })
      test(text(++index, data.type, 'int', int, l), () => {
        const hash = pseudoCrypto[data.type].hash(int, l)
        expect(BigInt(pseudoCrypto[data.type].unhash(hash))).toBe(int)
      })
      test(text(++index, data.type, 'lim', lim, l), () => {
        const hash = pseudoCrypto[data.type].hash(lim, l)
        expect(BigInt(pseudoCrypto[data.type].unhash(hash))).toBe(lim)
      })
    }
  }
}
