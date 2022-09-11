export function clamp(min: number, wanted: number, max: number){
  return Math.min(max, Math.max(wanted, min))
}