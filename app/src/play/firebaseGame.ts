import { doc, setDoc } from "firebase/firestore";
import { db, getUser } from "../firebase";

export async function addPlayer(gameId: string, name: string, icon: string, color: string){
  await setDoc(doc(db, 'games', gameId, 'players', getUser().uid), {
    name, icon, color
  })
}