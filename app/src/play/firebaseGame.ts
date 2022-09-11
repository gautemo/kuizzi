import { doc, setDoc } from "firebase/firestore";
import { db, getUser } from "../firebase";

export function addPlayer(gameId: string, name: string, icon: string, color: string){
  setDoc(doc(db, 'games', gameId, 'players', getUser().uid), {
    name, icon, color
  })
}

export function addAnswer(gameId: string, questionNr: number, alternative: 'a'|'b'|'c'|'d'){
  setDoc(doc(db, 'games', gameId, 'players', getUser().uid), {
    [questionNr]: alternative
  }, { merge: true})
}