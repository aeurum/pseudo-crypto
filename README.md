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
  inline: new PseudoCrypto('._'),
  wide: new PseudoCrypto('.-'),
  thin: new PseudoCrypto('-|'),
  lowercase: new PseudoCrypto('az'),
  uppercase: new PseudoCrypto('AZ'),
  alphabetic: new PseudoCrypto('Az'),
  alphanumeric: new PseudoCrypto('A9') // default
}
console.log([
  pc.numeric.hash(69, 2),      // 23
  pc.inline.hash(69, 4),       // usaz
  pc.wide.hash(69, 6),         // rpdhmh
  pc.thin.hash(69, 8),         // illllllI
  pc.lowercase.hash(69, 10),   // qtpahwvbdr
  pc.uppercase.hash(69, 12),   // QTPAHWUXUCHZ
  pc.alphabetic.hash(69, 14),  // haQEsDYzJiGKEJ
  pc.alphanumeric.hash(69, 16) // dwrVWc0nP0Ho08oX
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
