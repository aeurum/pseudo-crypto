export type FillString = string
export type CharacterCount = bigint
export type CharacterCodes = Array<number>
export type GoldenPrimes = Array<bigint>
export type GoldenInverses = Array<bigint>

export type CharacterSetType =
  | '09' | 'numeric'
  | 'l-' | 'wide'
  | 'l_' | 'inline'
  | 'az' | 'lowercase'
  | 'AZ' | 'uppercase'
  | 'Az' | 'alphabetic'
  | 'A9' | 'alphanumeric'

export interface BaseData {
  fillString: FillString,
  characterCount: CharacterCount,
  characterCodes: CharacterCodes
}
export interface GoldenData {
  primes: GoldenPrimes,
  inverses: GoldenInverses
}
export interface CharacterSetData {
  fillString: FillString,
  characterCount: CharacterCount,
  characterCodes: CharacterCodes,
  goldenPrimes: GoldenPrimes,
  goldenInverses: GoldenInverses
}
