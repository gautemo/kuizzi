import { doc, setDoc } from 'firebase/firestore'
import { db, getUser } from '../firebase'

export function addPlayer(gameId: string, name: string, icon: string, color: string) {
  setDoc(doc(db, 'games', gameId, 'players', getUser().uid), {
    name,
    icon,
    color,
    score: 0,
    addedScore: 0,
  })
}

export function addAnswer(gameId: string, questionNr: number, alternative: 'a' | 'b' | 'c' | 'd', newScore: number, addedScore: number) {
  setDoc(
    doc(db, 'games', gameId, 'players', getUser().uid),
    {
      [questionNr]: alternative,
      score: newScore,
      addedScore,
    },
    { merge: true }
  )
}
