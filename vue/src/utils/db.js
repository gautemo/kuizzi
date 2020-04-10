import { firebase, db, storage, getCurrentUser } from '@/firebase'

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

// Create questions code 👇
const uploadImg = img => {
  const path = `123/${img.name}`;
  storage.child(path).put(img);
  return path;
}

const addQuestion = async (quizId, question, imgs) => {
  if(imgs.q){
    question.img = uploadImg(imgs.q);
  }
  if (imgs.a){
    question.a = '[image]' + uploadImg(imgs.a);
  }
  if (imgs.b) {
    question.b = '[image]' + uploadImg(imgs.b);
  }
  if (imgs.c) {
    question.c = '[image]' + uploadImg(imgs.c);
  }
  if (imgs.d) {
    question.d = '[image]' + uploadImg(imgs.d);
  }

  const ref = db.collection('quizzes').doc(quizId).collection('questions');
  const nextId = (await ref.get()).docs.length + 1;
  ref.doc(nextId.toString()).set(question)
}

export { game as dbGame, getQuiz, getUid, addQuestion, getImgUrl }