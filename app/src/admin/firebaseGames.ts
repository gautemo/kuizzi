import { addDoc, collection, doc, getDoc, getDocs, query, runTransaction, setDoc, where } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, getUser, storage } from '../firebase'
import { ImageUtil } from '../shared/imageUtil'
import { GameContent, Quiz } from '../shared/types'

const collectionQuizzes = collection(db, 'quizzes')

export async function createQuiz() {
  const doc = await addDoc(collectionQuizzes, {
    name: 'no name',
    owner: getUser().uid,
    questions: [],
  })
  return doc.id
}

export async function getQuizzes() {
  const snapshot = await getDocs(query(collectionQuizzes, where('owner', '==', getUser().uid)))
  return snapshot.docs.map(d => {
    return { id: d.id, ...(d.data() as Quiz) }
  })
}

export async function getQuiz(id: string) {
  const snapshot = await getDoc(doc(db, 'quizzes', id))
  return snapshot.data() as Quiz
}

export async function saveQuiz(id: string, quiz: Quiz, images: File[]) {
  for(const question of quiz.questions){
    if(question.img && ImageUtil.isAddImage(question.img)){
      const image = ImageUtil.valueToAddImage(question.img)
      question.img = await uploadImage(id, ImageUtil.findImage(image, images))
    }
    if(ImageUtil.isAddImage(question.a)){
      const image = ImageUtil.valueToAddImage(question.a)
      question.a = ImageUtil.imagePrefix + await uploadImage(id, ImageUtil.findImage(image, images))
    }
    if(ImageUtil.isAddImage(question.b)){
      const image = ImageUtil.valueToAddImage(question.b)
      question.b = ImageUtil.imagePrefix + await uploadImage(id, ImageUtil.findImage(image, images))
    }
    if(ImageUtil.isAddImage(question.c)){
      const image = ImageUtil.valueToAddImage(question.c)
      question.c = ImageUtil.imagePrefix + await uploadImage(id, ImageUtil.findImage(image, images))
    }
    if(ImageUtil.isAddImage(question.d)){
      const image = ImageUtil.valueToAddImage(question.d)
      question.d = ImageUtil.imagePrefix + await uploadImage(id, ImageUtil.findImage(image, images))
    }
  }
  await setDoc(doc(db, 'quizzes', id), quiz)
}

export async function uploadImage(quizId: string, img: File) {
  const path = `${getUser().uid}/${quizId}/${img.name}-${img.lastModified}`;
  await uploadBytes(ref(storage, path), img)
  return path;
}


export async function createGame(quizId: string) {
  const gameId = await runTransaction(db, async (transaction) => {
    const pinsRef = doc(db, 'info', 'pins')
    const pinsDoc = await transaction.get(pinsRef)
    if (!pinsDoc.exists()) throw "Document does not exist!"
    const pin: number = pinsDoc.data().count + 1

    const quizDoc = await transaction.get(doc(db, 'quizzes', quizId))
    const initialGame: GameContent = {
      question: 0,
      state: 'notstarted',
      quiz: quizDoc.data() as Quiz
    }
    transaction.set(doc(db, 'games', pin.toString()), initialGame)
    transaction.update(pinsRef, { count: pin })
    return pin
  })
  return gameId
}