import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth'
import { collection, connectFirestoreEmulator, doc, getFirestore, query } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { ref, getDownloadURL } from 'firebase/storage'

const app = initializeApp({
  apiKey: 'AIzaSyC2zSi5L3hsAudpae05vWNMm2ggv8Z8cuY',
  authDomain: 'kuizzi.app',
  databaseURL: 'https://kuizzi.firebaseio.com',
  projectId: 'kuizzi',
  storageBucket: 'kuizzi.appspot.com',
  messagingSenderId: '387785143932',
  appId: '1:387785143932:web:c07941800a49891c3a7bf9',
  measurementId: 'G-FKDG7M6PG8',
})

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

if (import.meta.env.VITE_FIREBASE_EMULATOR === 'true' && !auth.emulatorConfig) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}

export async function getImageUrl(path: string) {
  return await getDownloadURL(ref(storage, path))
}

export async function signInAnonym() {
  await signInAnonymously(auth).catch(error => console.error(`Could not anonymously sign in. You probably can't play`, error))
}

export function getGameRef(id: string) {
  return doc(db, 'games', id)
}

export function getGamePlayersQuery(gameId: string) {
  return query(collection(db, 'games', gameId, 'players'))
}

export function getUser() {
  const user = auth.currentUser
  if (!user) throw new Error('user is not signed in')
  return user
}
