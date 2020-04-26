import { firebase, db, storage, getCurrentUser } from '@/firebase'

const getUid = async () => (await getCurrentUser()).uid;

const game = {
  ref: null,
  get game(){ 
    return this.ref 
  },
  setGame(pin){ 
    this.ref = db.collection('games').doc(pin.toString());
  },
  listen: fun => game.ref.onSnapshot(doc => fun(doc.data())),
  addPlayer: async player => {
    const uid = await getUid();
    game.ref.update({
      players: firebase.firestore.FieldValue.arrayUnion({ ...player, uid })
    });
    return uid;
  },
  answer: async (nr, alt, score) => {
    const uid = await getUid();
    const update = {};
    update[`answer${nr}`] = firebase.firestore.FieldValue.arrayUnion({uid, alt, score})
    game.ref.update(update);
  },
  updateState: (state, question) => {
    const update = {state}
    if(question){
      update.question = question;
    }
    game.ref.update(update);
  }
};

const getQuiz = async id => {
  const doc = await db.collection('quizzes').doc(id).get();
  const questionDocs = await doc.ref.collection('questions').get();
  const questions = questionDocs.docs.map(d => ({ id: d.id, ...d.data() }));
  return { name: doc.data().name, questions }
}

const getImgUrl = async path => await storage.child(path).getDownloadURL();

export { game as dbGame, getQuiz, getUid, getImgUrl }