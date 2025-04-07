# Pseudo Crypto
Pseudo Crypto can help you hash numeric identifiers.

## Installation
```
npm i pseudo-crypto
```

## Usage
```
const PseudoCrypto = require('pseudo-crypto')
// import PseudoCrypto from 'pseudo-crypto'

const pc = {
  numeric: new PseudoCrypto('09'),
  inline: new PseudoCrypto('l_'),
  wide: new PseudoCrypto('l-'),
  lowercase: new PseudoCrypto('az'),
  uppercase: new PseudoCrypto('AZ'),
  alphabetic: new PseudoCrypto('Az'),
  alphanumeric: new PseudoCrypto('A9') // default
}
console.log([
  pc.numeric.hash(123, 4),      // 2231
  pc.inline.hash(123, 6),       // amcnno
  pc.wide.hash(123, 8),         // amakvopn
  pc.lowercase.hash(123, 10),   // amhocteszt
  pc.uppercase.hash(123, 12),   // AMHOCTEMZQOF
  pc.alphabetic.hash(123, 14),  // AxIRjfDrnqmIwH
  pc.alphanumeric.hash(123, 16) // 17swtRKHykKxTu9D
].join('\n'))
```

You can also configure it to always unhash to `BigInt`:
```
const pc = new PseudoCrypto('A9', true)
// OR pc.onlyBigInt = true
```


## Contributing
Contributions are only allowed in TON:
```
UQCYqT9-ycmXE3o57Cac1sM5ntIKdjqIwP3kzWmiZik0VU_b
```
