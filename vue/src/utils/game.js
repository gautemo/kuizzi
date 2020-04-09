import { ref, reactive } from 'vue'
import { quizId } from '@/utils/questions'
import { dbGame, getUid } from '@/utils/db'

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
    me.name = name;
    me.icon = icon;
    me.color = color;
    me.score = 0;
    me.uid = dbGame.addPlayer(me);
}

const goToGame = id => {
    dbGame.setGame(id);
    dbGame.listen(async data => {
        data.players = data.players.map(p => JSON.parse(p));
        game.value = data;

        if (quizId.value !== data.quizid){
            quizId.value = data.quizid;
        }

        if(!me.name){
            const uid = await getUid();
            const meInDb = data.players.find(p => p.uid === uid);
            if(meInDb){
                me.name = meInDb.name;
                me.icon = meInDb.icon;
                me.color = meInDb.color;
                me.uid = meInDb.uid;
                me.score = meInDb.score;
            }
        }
    })
}

export { goToGame, game, me, addMe };