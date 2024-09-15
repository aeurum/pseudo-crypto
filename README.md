# Pseudo Crypto
Pseudo Crypto can help you hash numeric identifiers.

## Installation
```
npm i pseudo-crypto
```

## Usage
```
const { PseudoCrypto } = require('pseudo-crypto')
// import { PseudoCrypto } from 'pseudo-crypto'

const pc = {
  numeric: new PseudoCrypto('09'),
  uppercase: new PseudoCrypto('AZ'),
  lowercase: new PseudoCrypto('az'),
  lowercase_wide: new PseudoCrypto('l-'),
  lowercase_inline: new PseudoCrypto('l_'),
  alphabetic: new PseudoCrypto('Az'),
  alphanumeric: new PseudoCrypto('AN') // default
}
console.log([
  pc.numeric.hash(12345),               // 81485
  pc.uppercase.hash(12345, 6),          // QJQYJR
  pc.lowercase.hash(12345, 8),          // qjpsdsql
  pc.lowercase_wide.hash(12345, 10),    // rerrowgbkd
  pc.lowercase_inline.hash(12345, 12),  // ueoevwcxavec
  pc.alphabetic.hash(12345, 14),        // gmVcZTCcUhvqOF
  pc.alphanumeric.hash(12345, 16)       // d29BtQouSWVtnhIX
].join('\n'))
```