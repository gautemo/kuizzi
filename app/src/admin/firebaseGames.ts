import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { user } from "./firebaseAuth";
import { Quiz } from "./types";

const collectionQuizzes = collection(db, 'quizzes')

export async function createQuiz(uid: string){
  const doc = await addDoc(collectionQuizzes, {
    name: 'no name',
    owner: uid,
    questions: [],
  })
  return doc.id
}

export async function getQuizzes() {
  const snapshot = await getDocs(query(collectionQuizzes, where('owner', '==', user.value!.uid)))
  return snapshot.docs.map(d => {
    return { id: d.id, ...d.data() as Quiz }
  })
}

export async function getQuiz(id: string){
  const snapshot = await getDoc(doc(db, 'quizzes', id))
  return snapshot.data() as Quiz
}

export async function saveQuiz(id: string, quiz: Quiz){
  await setDoc(doc(db, 'quizzes', id), quiz)
}