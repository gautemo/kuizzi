export function clamp(min: number, wanted: number, max: number) {
  return Math.min(max, Math.max(wanted, min))
}

export function sum(array: number[]){
  return array.reduce((acc, current) => acc + current, 0)
}