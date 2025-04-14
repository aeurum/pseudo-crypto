from sympy import isprime, nextprime, mod_inverse
from fractions import Fraction
import sys

def calculate_primes_and_inverses():
    character_count = int(sys.argv[1])
    golden_ratio = Fraction(1618033988749895, 1000000000000000)

    print("Primes:")
    primes = []

    for i in range(17):
        numerator = character_count ** i
        result = numerator / golden_ratio
        prime = nextprime(int(result))
        primes.append(prime)
        print(f"  BigInt('{prime}'),")

    print("\nInverses:")
    for i, prime in enumerate(primes):
        modulus = character_count ** i
        try:
            inverse = mod_inverse(prime, modulus)
            print(f"  BigInt('{inverse}'),")
        except ValueError:
            print("  BigInt('0'),")

if __name__ == "__main__":
    calculate_primes_and_inverses()
