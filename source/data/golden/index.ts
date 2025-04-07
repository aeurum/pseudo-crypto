import { GoldenData } from '../../interfaces'
import { primes10, inverses10 } from './10'
import { primes13, inverses13 } from './13'
import { primes21, inverses21 } from './21'
import { primes26, inverses26 } from './26'
import { primes52, inverses52 } from './52'
import { primes62, inverses62 } from './62'

export const goldenData: Record<string, GoldenData> = {
  10: { primes: primes10, inverses: inverses10 },
  13: { primes: primes13, inverses: inverses13 },
  21: { primes: primes21, inverses: inverses21 },
  26: { primes: primes26, inverses: inverses26 },
  52: { primes: primes52, inverses: inverses52 },
  62: { primes: primes62, inverses: inverses62 }
}
