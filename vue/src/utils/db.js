import { firebase, db, getCurrentUser } from '@/firebase'

const getUid = async () => (await getCurrentUser()).uid;

const game = {
  ref: null,
  get game(){ 
    return this.ref 
  },
  setGame(id){ 
    this.ref = db.collection('games').doc(id);
  },
  listen: fun => game.ref.onSnapshot(doc => fun(doc.data())),
  addPlayer: async player => {
    const uid = await getUid();
    game.ref.update({
      players: firebase.firestore.FieldValue.arrayUnion(JSON.stringify({ ...player, uid }))
    });
    return uid;
  },
  answer: async (nr, alt, score) => {
    const uid = await getUid();
    const update = {};
    update[`answer${nr}`] = firebase.firestore.FieldValue.arrayUnion({uid, alt, score})
    game.ref.update(update);
  }
};

const getQuiz = async id => {
  const doc = await db.collection('quizzes').doc(id).get();
  const questionDocs = await doc.ref.collection('questions').get();
  const questions = questionDocs.docs.map(d => ({ id: d.id, ...d.data() }));
  return { name: doc.data().name, questions }
}

export { game as dbGame, getQuiz, getUid }