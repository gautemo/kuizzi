import { db } from '@/firebase'

const getUserQuizzes = async uid => {
  const quizzes = await db.collection('quizzes').where("owner", "==", uid).get();
  return quizzes.docs.map(doc => ({ id: doc.id, ...doc.data() }) );
}

const createQuiz = async uid => {
  const doc = await db.collection('quizzes').add({
    name: 'no name',
    owner: uid
  });
  return doc.id;
}

export { getUserQuizzes, createQuiz }