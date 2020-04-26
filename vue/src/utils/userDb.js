import { db, storage } from '@/firebase'
import { getCurrentUser } from '@/firebase'

const getUserQuizzes = async uid => {
  const quizzes = await db.collection('quizzes').where("owner", "==", uid).get();
  return quizzes.docs.map(doc => ({ id: doc.id, ...doc.data() }) );
}

const getQuiz = async id => {
  const doc = await db.collection('quizzes').doc(id).get();
  return { id: doc.id, ...doc.data() }
}

const createQuiz = async uid => {
  const doc = await db.collection('quizzes').add({
    name: 'no name',
    owner: uid,
    questions: [],
  });
  return doc.id;
}

const updateQuiz = async (quizId, quiz) => {
  const uid = (await getCurrentUser()).uid;

  const questions = [];

  for(const {text, time, isReveal, correct, a, b, c, d, imgs} of quiz.questions){
    const question = { text, time, isReveal, correct, a, b, c, d };

    if (imgs.q) {
      question.img = uploadImg(uid, quizId, imgs.q);
    }
    if (imgs.a) {
      question.a = '[image]' + uploadImg(uid, quizId, imgs.a);
    }
    if (imgs.b) {
      question.b = '[image]' + uploadImg(uid, quizId, imgs.b);
    }
    if (imgs.c) {
      question.c = '[image]' + uploadImg(uid, quizId, imgs.c);
    }
    if (imgs.d) {
      question.d = '[image]' + uploadImg(uid, quizId, imgs.d);
    }
    questions.push(question);
  }

  await db.collection('quizzes').doc(quizId).update({
    name: quiz.name,
    questions
  });
}

const uploadImg = (uid, quizId, img) => {
  const path = `${uid}/${quizId}/${img.name}`;
  storage.child(path).put(img);
  return path;
}

export { getUserQuizzes, getQuiz, createQuiz, updateQuiz }