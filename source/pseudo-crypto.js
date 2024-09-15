export { PseudoCrypto }

class PseudoCrypto {
  /**
   * @type {string}
   * Fill string.
   */
  #fillString
  /**
   * @type {bigint}
   * Character count.
   */
  #characterCount
  /**
   * @type {array}
   * Character codes.
   */
  #characterCodes
  /**
   * @type {array}
   * Next primes greater than
   * character_count ^ i /
   * 1.618033988749894.
   */
  #goldenPrimes
  /**
   * @type {array}
   * Modular multiplicative
   * inverses of the primes
   * (mod character_count ^ i).
   */
  #goldenInverses

  constructor(type) {
    const data = this.#data(type)
    this.#fillString = data.fill_string
    this.#goldenPrimes = data.golden_primes
    this.#goldenInverses = data.golden_inverses
    this.#characterCount = data.character_count
    this.#characterCodes = data.character_codes
  }

  #data(type = 'alphanumeric') {
    switch (type) {
      case '09':
      case 'numeric':
        return {
          fill_string: '0',
          golden_primes: this.#primes(10),
          golden_inverses: this.#inverses(10),
          character_count: BigInt(10),
          character_codes: this.#range(48, 57)
        }
      case 'AZ':
      case 'uppercase':
        return {
          fill_string: 'A',
          golden_primes: this.#primes(26),
          golden_inverses: this.#inverses(26),
          character_count: BigInt(26),
          character_codes: this.#range(65, 90)
        }
      case 'az':
      case 'lowercase':
        return {
          fill_string: 'a',
          golden_primes: this.#primes(26),
          golden_inverses: this.#inverses(26),
          character_count: BigInt(26),
          character_codes: this.#range(97, 122)
        }
      case 'l-':
      case 'lowercase-wide':
        return {
          fill_string: 'a',
          golden_primes: this.#primes(21),
          golden_inverses: this.#inverses(21),
          character_count: BigInt(21),
          character_codes: 'abcdeghkmnopqrsuvwxyz'.split('').map(v => v.charCodeAt(0))
        }
      case 'l_':
      case 'lowercase-inline':
        return {
          fill_string: 'a',
          golden_primes: this.#primes(13),
          golden_inverses: this.#inverses(13),
          character_count: BigInt(13),
          character_codes: 'acemnorsuvwxz'.split('').map(v => v.charCodeAt(0))
        }
      case 'Az':
      case 'alphabetic':
        return {
          fill_string: 'A',
          golden_primes: this.#primes(52),
          golden_inverses: this.#inverses(52),
          character_count: BigInt(52),
          character_codes: [ ...this.#range(65, 90), ...this.#range(97, 122) ]
        }
      case 'AN':
      case 'alphanumeric':
        return {
          fill_string: '0',
          golden_primes: this.#primes(62),
          golden_inverses: this.#inverses(62),
          character_count: BigInt(62),
          character_codes: [ ...this.#range(48, 57), ...this.#range(65, 90), ...this.#range(97, 122) ]
        }
    }
  }
  #primes(number) {
    switch (number) {
      case 10:
        return [
          BigInt('2'),
          BigInt('7'),
          BigInt('67'),
          BigInt('619'),
          BigInt('6197'),
          BigInt('61813'),
          BigInt('618041'),
          BigInt('6180341'),
          BigInt('61803419'),
          BigInt('618034003'),
          BigInt('6180339923'),
          BigInt('61803398903'),
          BigInt('618033988751'),
          BigInt('6180339887543'),
          BigInt('61803398875019'),
          BigInt('618033988749911'),
          BigInt('6180339887498971')
        ]
      case 13:
        return [
          BigInt('2'),
          BigInt('11'),
          BigInt('107'),
          BigInt('1361'),
          BigInt('17657'),
          BigInt('229487'),
          BigInt('2983139'),
          BigInt('38780717'),
          BigInt('504149341'),
          BigInt('6553941047'),
          BigInt('85201233643'),
          BigInt('1107616036837'),
          BigInt('14399008478509'),
          BigInt('187187110220261'),
          BigInt('2433432432863387'),
          BigInt('31634621627224111'),
          BigInt('411250081153910567')
        ]
      case 21:
        return [
          BigInt('2'),
          BigInt('13'),
          BigInt('277'),
          BigInt('5737'),
          BigInt('120199'),
          BigInt('2524117'),
          BigInt('53006381'),
          BigInt('1113133949'),
          BigInt('23375812639'),
          BigInt('490892065387'),
          BigInt('10308733372867'),
          BigInt('216483400829453'),
          BigInt('4546151417418511'),
          BigInt('95469179765788463'),
          BigInt('2004852775081557641'),
          BigInt('42101908276712708867'),
          BigInt('884140073810966885477')
        ]
      case 26:
        return [
          BigInt('2'),
          BigInt('17'),
          BigInt('419'),
          BigInt('10867'),
          BigInt('282427'),
          BigInt('7343107'),
          BigInt('190920451'),
          BigInt('4963931759'),
          BigInt('129062223683'),
          BigInt('3355617815651'),
          BigInt('87246063206927'),
          BigInt('2268397643379331'),
          BigInt('58978338727860347'),
          BigInt('1533436806924367339'),
          BigInt('39869356980033548923'),
          BigInt('1036603281480872271857'),
          BigInt('26951685318502679066009')
        ]
      case 52:
        return [
          BigInt('2'),
          BigInt('37'),
          BigInt('1693'),
          BigInt('86923'),
          BigInt('4518859'),
          BigInt('234979021'),
          BigInt('12218908787'),
          BigInt('635383255037'),
          BigInt('33039929261789'),
          BigInt('1718076321612767'),
          BigInt('89339968723859369'),
          BigInt('4645678373640686797'),
          BigInt('241575275429315704687'),
          BigInt('12561914322324416642513'),
          BigInt('653219544760869665410597'),
          BigInt('33967416327565222601344681'),
          BigInt('1766305649033391575269916279')
        ]
      case 62:
        return [
          BigInt('2'),
          BigInt('41'),
          BigInt('2377'),
          BigInt('147299'),
          BigInt('9132313'),
          BigInt('566201239'),
          BigInt('35104476161'),
          BigInt('2176477521929'),
          BigInt('134941606358731'),
          BigInt('8366379594239857'),
          BigInt('518715534842867629'),
          BigInt('32160363160257792067'),
          BigInt('1993942515935983106231'),
          BigInt('123624435988030952586047'),
          BigInt('7664715031257919060334479'),
          BigInt('475212331937990981740733777'),
          BigInt('29463164580155440867925492921')
        ]
    }
  }
  #inverses(number) {
    switch (number) {
      case 10:
        return [
          BigInt('0'),
          BigInt('3'),
          BigInt('3'),
          BigInt('979'),
          BigInt('1533'),
          BigInt('30877'),
          BigInt('519561'),
          BigInt('9991261'),
          BigInt('32652179'),
          BigInt('270440667'),
          BigInt('229552987'),
          BigInt('71918074567'),
          BigInt('37014448751'),
          BigInt('8888268390407'),
          BigInt('46560923756579'),
          BigInt('34164613497191'),
          BigInt('5187581788398931')
        ]
      case 13:
        return [
          BigInt('0'),
          BigInt('6'),
          BigInt('139'),
          BigInt('770'),
          BigInt('17793'),
          BigInt('4946'),
          BigInt('3230873'),
          BigInt('53485004'),
          BigInt('479455745'),
          BigInt('6116601228'),
          BigInt('56042848808'),
          BigInt('1234269361955'),
          BigInt('3230380485977'),
          BigInt('26179300841010'),
          BigInt('3896972692066313'),
          BigInt('41607168365184312'),
          BigInt('222703042258456608')
        ]
      case 21:
        return [
          BigInt('0'),
          BigInt('13'),
          BigInt('121'),
          BigInt('2536'),
          BigInt('139822'),
          BigInt('273148'),
          BigInt('68964470'),
          BigInt('232358912'),
          BigInt('14539997257'),
          BigInt('124232667718'),
          BigInt('15567082457002'),
          BigInt('202207040422328'),
          BigInt('3264966975443848'),
          BigInt('80030427195322712'),
          BigInt('1564052260528651016'),
          BigInt('62175833738119301519'),
          BigInt('946681698849852772649')
        ]
      case 26:
        return [
          BigInt('0'),
          BigInt('23'),
          BigInt('555'),
          BigInt('4003'),
          BigInt('200259'),
          BigInt('6405355'),
          BigInt('166406827'),
          BigInt('2348544655'),
          BigInt('99013302891'),
          BigInt('1020941221707'),
          BigInt('95795217660143'),
          BigInt('479830684898347'),
          BigInt('10033507223729843'),
          BigInt('2312125289585707715'),
          BigInt('58012575907549666483'),
          BigInt('1204672436721283035409'),
          BigInt('26042798102750233448105')
        ]
      case 52:
        return [
          BigInt('0'),
          BigInt('45'),
          BigInt('789'),
          BigInt('98275'),
          BigInt('4792803'),
          BigInt('18504197'),
          BigInt('3605210299'),
          BigInt('872383628629'),
          BigInt('6381573343605'),
          BigInt('1606093097711647'),
          BigInt('122865877613730969'),
          BigInt('2043452977264427013'),
          BigInt('348656741370725648271'),
          BigInt('4661925816478442011441'),
          BigInt('21331051151155421175213'),
          BigInt('22865657849047106158804377'),
          BigInt('2834643315706544678749403975')
        ]
      case 62:
        return [
          BigInt('0'),
          BigInt('59'),
          BigInt('1677'),
          BigInt('187507'),
          BigInt('5952585'),
          BigInt('643566407'),
          BigInt('22071637057'),
          BigInt('294289236153'),
          BigInt('88879354792675'),
          BigInt('7275288500431249'),
          BigInt('530317909162771493'),
          BigInt('26341070983562945643'),
          BigInt('690999432708367660295'),
          BigInt('700366256160323916991'),
          BigInt('2343937801448434466383727'),
          BigInt('622277944959361296777626545'),
          BigInt('1228781989677521424978592137')
        ]
    }
  }
  #range(from, to, step = 1) {
    return Array.from({ length: (to - from) / step + 1 }, (_, i) => from + i * step)
  }

  #base(int) {
    let key = ''
    const nil = BigInt(0)
    while (int > nil) {
      const left = int % this.#characterCount
      const code = this.#characterCodes[left]
      key += String.fromCharCode(code)
      int /= this.#characterCount
    }
    return key.split('').reverse().join('')
  }
  #unbase(key) {
    return key.split('').reverse().reduce((acc, v, i) => {
      return acc + BigInt(this.#characterCodes.indexOf(v.charCodeAt(0))) * this.#characterCount ** BigInt(i)
    }, BigInt(0))
  }
  hash(number, length = 5) {
    if (!length || length >= this.#goldenPrimes.length) length = this.#goldenPrimes.length - 1
    const ceil = this.#characterCount ** BigInt(length)
    return this.#base(BigInt(number) * this.#goldenPrimes[length] % ceil).padStart(length, this.#fillString)
  }
  unhash(string) {
    return Number(this.#unbase(string) * this.#goldenInverses[string.length] % this.#characterCount ** BigInt(string.length))
  }

  gett() {
    return this.#characterCodes
  }
  getx() {
    return this.#goldenPrimes
  }
}