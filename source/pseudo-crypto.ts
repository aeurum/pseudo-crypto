import {
  GoldenPrimes,
  GoldenInverses,
  FillString,
  CharacterCount,
  CharacterCodes,
  CharacterSetType
} from './interfaces'
import { derive } from './data'

export = PseudoCrypto

class PseudoCrypto {
  /**
   * @type {boolean}
   * Should always unhash to BigInt?
   */
  onlyBigInt: boolean
  /**
   * @type {string}
   * Fill string.
   */
  private fillString: FillString
  /**
   * @type {bigint}
   * Character count.
   */
  private characterCount: CharacterCount
  /**
   * @type {array}
   * Character codes.
   */
  private characterCodes: CharacterCodes
  /**
   * @type {array}
   * Next primes greater than
   * character_count ^ i /
   * 1.618033988749894.
   */
  private goldenPrimes: GoldenPrimes
  /**
   * @type {array}
   * Modular multiplicative
   * inverses of the primes
   * (mod character_count ^ i).
   */
  private goldenInverses: GoldenInverses

  constructor(
    type: CharacterSetType = 'alphanumeric',
    onlyBigInt: boolean = false
  ) {
    const data = derive(this.adjustType(type))
    this.onlyBigInt = onlyBigInt
    this.fillString = data.fillString
    this.characterCount = data.characterCount
    this.characterCodes = data.characterCodes
    this.goldenPrimes = data.goldenPrimes
    this.goldenInverses = data.goldenInverses
  }

  private adjustType(type: CharacterSetType): CharacterSetType {
    switch (type) {
      case '09': case 'numeric':      return 'numeric'
      case '._': case 'inline':       return 'inline'
      case '.-': case 'wide':         return 'wide'
      case '-|': case 'thin':         return 'thin'
      case 'az': case 'lowercase':    return 'lowercase'
      case 'AZ': case 'uppercase':    return 'uppercase'
      case 'Az': case 'alphabetic':   return 'alphabetic'
      case 'A9': case 'alphanumeric': return 'alphanumeric'
    }
  }

  private base(int: bigint): string {
    let key = ''
    const nil = BigInt(0)
    while (int > nil) {
      const mod = int % this.characterCount
      const asc = this.characterCodes[Number(mod)]
      key += String.fromCharCode(asc)
      int /= this.characterCount
    }
    return key.split('').reverse().join('')
  }
  hash(number: number | bigint, length = 5): string {
    if (!length || length >= this.goldenPrimes.length)
      length = this.goldenPrimes.length - 1
    const ceil = this.characterCount ** BigInt(length)
    const prime = this.goldenPrimes[length]
    const dec = BigInt(number) * prime % ceil
    const hash = this.base(dec)
    return hash.padStart(length, this.fillString)
  }

  private unbase(key: string): bigint {
    return key.split('').reverse().reduce((accumulator, value, index) => {
      const dec = BigInt(this.characterCodes.indexOf(value.charCodeAt(0)))
      return accumulator + dec * this.characterCount ** BigInt(index)
    }, BigInt(0))
  }
  unhash(string: string): number | bigint {
    const length = string.length
    const ceil = this.characterCount ** BigInt(length)
    const inverse = this.goldenInverses[length]
    const number = this.unbase(string)
    const dec = number * inverse % ceil
    return this.onlyBigInt || dec > Number.MAX_SAFE_INTEGER ? dec : Number(dec)
  }
}
