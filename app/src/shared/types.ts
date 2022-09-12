export interface AddImage {
  lastModified: number
  name: string
  srcUrl: string
}

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
  correct: Array<'a' | 'b' | 'c' | 'd'>
  time: number
  img: string | null
  isReveal: boolean
}

export interface Game extends GameContent {
  id: string
}

export type GameState = 'notstarted' | 'question' | 'reveal' | 'score' | 'ended'

export interface GameContent {
  question: number
  quiz: Quiz
  state: GameState
  timeStarted: number
}

export interface Player {
  id: string
  icon: string
  color: string
  name: string
  points: number[]
  [key: number]: 'a' | 'b' | 'c' | 'd'
}
