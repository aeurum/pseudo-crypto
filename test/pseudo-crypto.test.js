import { PseudoCrypto } from '../source/pseudo-crypto'

const pseudo_crypto = {
  numeric: new PseudoCrypto('numeric'),
  uppercase: new PseudoCrypto('uppercase'),
  lowercase: new PseudoCrypto('lowercase'),
  lowercase_wide: new PseudoCrypto('l-'),
  lowercase_inline: new PseudoCrypto('l_'),
  alphabetic: new PseudoCrypto('alphabetic'),
  alphanumeric: new PseudoCrypto('alphanumeric')
}

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

for (const data of [
  { type: 'numeric', cc: 10 },
  { type: 'uppercase', cc: 26 },
  { type: 'lowercase', cc: 26 },
  { type: 'lowercase_wide', cc: 21 },
  { type: 'lowercase_inline', cc: 13 },
  { type: 'alphabetic', cc: 52 },
  { type: 'alphanumeric', cc: 62 }
]) {
  for (let i = 0; i < 1000; i++) {
    const length = random(1, 16)
    const current_limit = BigInt(data.cc ** length - 1)
    const max_integer = BigInt(Number.MAX_SAFE_INTEGER)
    const number = random(1, Number(current_limit <= max_integer ? current_limit : max_integer))
    test(`Iteration ${i}: ${data.type} hash/unhash for num ${number} and len ${length}`, () => {
      expect(pseudo_crypto[data.type].unhash(pseudo_crypto[data.type].hash(number, length))).toBe(number)
    })
  }
}