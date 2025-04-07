export function range(from: number, to: number, step = 1) {
  return Array.from(
    { length: (to - from) / step + 1 },
    (_, i) => from + i * step
  )
}
export function unchain(line: string) {
  return line.split('').map(letter => letter.charCodeAt(0))
}
