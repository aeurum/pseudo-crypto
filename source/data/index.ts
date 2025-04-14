import {
  CharacterSetType,
  BaseData,
  CharacterSetData
} from '../interfaces'
import { goldenData } from './golden'
import { range, unchain } from '../sequencers'

export function derive(type: CharacterSetType): CharacterSetData {
  for (const type in baseData) {
    const characterCount = Number(baseData[type].characterCount)
    characterSetData[type] = {
      ...baseData[type],
      goldenPrimes: goldenData[characterCount].primes,
      goldenInverses: goldenData[characterCount].inverses
    }
  }
  return characterSetData[type]
}

const characterSetData: Record<string, CharacterSetData> = { }

const baseData: Record<string, BaseData> = {
  numeric: {
    fillString: '0',
    characterCount: BigInt(10),
    characterCodes: range(48, 57)
  },
  inline: {
    fillString: 'a',
    characterCount: BigInt(13),
    characterCodes: unchain('acemnorsuvwxz')
  },
  wide: {
    fillString: 'a',
    characterCount: BigInt(21),
    characterCodes: unchain('abcdeghkmnopqrsuvwxyz')
  },
  thin: {
    fillString: 'I',
    characterCount: BigInt(3),
    characterCodes: unchain('Iil')
  },
  lowercase: {
    fillString: 'a',
    characterCount: BigInt(26),
    characterCodes: range(97, 122)
  },
  uppercase: {
    fillString: 'A',
    characterCount: BigInt(26),
    characterCodes: range(65, 90)
  },
  alphabetic: {
    fillString: 'A',
    characterCount: BigInt(52),
    characterCodes: [ ...range(65, 90), ...range(97, 122) ]
  },
  alphanumeric: {
    fillString: '0',
    characterCount: BigInt(62),
    characterCodes: [ ...range(48, 57), ...range(65, 90), ...range(97, 122) ]
  }
}
