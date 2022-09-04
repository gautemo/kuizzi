export interface Quiz {
  name: string
  owner: string
  questions: Question[]
}

export interface Question {
  id: number
  text: string
  a: string
  b: string
  c: string
  d: string
  correct: Array<'a'|'b'|'c'|'d'>
  time: number
  img: string | null
  isReveal: boolean
}