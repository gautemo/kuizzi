import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  onAuthStateChanged, 
  connectAuthEmulator, 
  GoogleAuthProvider, 
  signInWithRedirect,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'
import { router } from './router'

const app = initializeApp({
  apiKey: "AIzaSyC2zSi5L3hsAudpae05vWNMm2ggv8Z8cuY",
  authDomain: "kuizzi.firebaseapp.com",
  databaseURL: "https://kuizzi.firebaseio.com",
  projectId: "kuizzi",
  storageBucket: "kuizzi.appspot.com",
  messagingSenderId: "387785143932",
  appId: "1:387785143932:web:c07941800a49891c3a7bf9",
  measurementId: "G-FKDG7M6PG8"
})

const auth = getAuth(app)
if(import.meta.env.VITE_FIREBASE_EMULATOR === 'true'){
  connectAuthEmulator(auth, 'http://localhost:9099')
}
export const { user } = useAuth(auth)

export function userIsSignedIn(): Promise<boolean>{
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe()
      resolve(user !== null)
    }, reject)
  })
}

export function signInGoogle(){
  signInWithRedirect(auth, new GoogleAuthProvider())
}

export async function createAccount(email: string, password: string, toPath: string){
  await createUserWithEmailAndPassword(auth, email, password)
  router.push(toPath)
}

export async function signInEmailAndPassword(email: string, password: string, toPath: string){
  await signInWithEmailAndPassword(auth, email, password)
  router.push(toPath)
}

export async function signInEmailLink(email: string, toPath: string){
  await sendSignInLinkToEmail(auth, email, {
    url: location.origin + toPath,
    handleCodeInApp: true,
  })
  localStorage.setItem('emailForSignIn', email)
}

export async function checkIsSignInWithEmailLink(){
  if(isSignInWithEmailLink(auth, location.href)) {
    let email = localStorage.getItem('emailForSignIn')
    if(!email){
      email = window.prompt('Please provide your email for confirmation')
    }
    if(!email) throw Error('email not provided')
    await signInWithEmailLink(auth, email)
    localStorage.removeItem('emailForSignIn')
  }
}

export async function getEmailState(email: string){
  const options = await fetchSignInMethodsForEmail(auth, email)
  if(options.length === 0) return 'not_user'
  if(options.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) return 'has_password'
  return 'no_password'
}

export async function signUserOut(){
  await signOut(auth)
  router.push('/signin')
}

export async function resetPassword(email: string){
  await sendPasswordResetEmail(auth, email)
}