import { firebase, db, getCurrentUser } from '@/firebase'
import { ref, reactive } from 'vue'

const game = ref({
    players: [],
    question: 0,
    questionStarted: false,
    quizid: '',
});
const me = reactive({
    name: '',
    icon: '',
    color: '',
    uid: '',
})

const addMe = async (name, icon, color) => {
    const user = await getCurrentUser();
    me.uid = user.uid;
    me.name = name;
    me.icon = icon;
    me.color = color;
    gameRef.update({
        players: firebase.firestore.FieldValue.arrayUnion(JSON.stringify({...me}))
    });
}

let gameRef = null;

const goToGame = id => {
    gameRef = db.collection('games').doc(id);
    gameRef.onSnapshot(async doc => {
        const data = doc.data();
        data.players = data.players.map(p => JSON.parse(p));
        game.value = data;

        if(!me.name){
            const user = await getCurrentUser();
            const meInDb = data.players.find(p => p.uid === user.uid);
            if(meInDb){
                me.name = meInDb.name;
                me.icon = meInDb.icon;
                me.color = meInDb.color;
                me.uid = meInDb.uid;
            }
        }
    })
}

export { goToGame, game, me, addMe };