import { doc, setDoc } from 'firebase/firestore'
import { db, getUser } from '../firebase'

export function addPlayer(gameId: string, name: string, icon: string, color: string, nrQuestions: number) {
  setDoc(doc(db, 'games', gameId, 'players', getUser().uid), {
    name,
    icon,
    color,
    points: Array.from({ length: nrQuestions }, () => 0),
  })
}

export function addAnswer(gameId: string, questionNr: number, alternative: 'a' | 'b' | 'c' | 'd', points: number[]) {
  setDoc(
    doc(db, 'games', gameId, 'players', getUser().uid),
    {
      [questionNr]: alternative,
      points,
    },
    { merge: true },
  )
}
