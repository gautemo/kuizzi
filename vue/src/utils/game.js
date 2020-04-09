import { ref, reactive, computed } from 'vue'
import { quizId } from '@/utils/questions'
import { dbGame, getUid } from '@/utils/db'

const game = ref({
    players: [],
    question: 0,
    questionStarted: false,
    quizid: '',
});

const scores = computed(() => {
    const players = game.value.players.map(p => ({...p, score: 0}));
    for (const [key, value] of Object.entries(game.value)) {
        if (key.startsWith('answer')) {
            for(const p of players){
                const playerAnswer = value.find(p => p.uid === me.uid);
                if (playerAnswer) p.score += playerAnswer.score;
            }
        }
    }
    return players.sort((a,b) => b.score - a.score);
})

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
    me.uid = await dbGame.addPlayer(me);
}

const goToGame = id => {
    dbGame.setGame(id);
    dbGame.listen(async data => {
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

export { goToGame, game, me, addMe, scores };