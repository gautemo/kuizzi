import { ref, computed } from 'vue'
import { quizId } from '@/utils/questions'
import { dbGame } from '@/utils/db'
import { sortedPlayers } from '@/utils/helper'

const game = ref({
    players: [],
    question: 0,
    state: '',
    quizid: '',
});

const scores = computed(() => sortedPlayers(game.value.players))

const goToGame = (id, callback) => {
    dbGame.setGame(id);
    dbGame.listen(async data => {
        game.value = data;

        if (quizId.value !== data.quizid){
            quizId.value = data.quizid;
        }

        if(callback){
            callback(data)
        }
    })
}

const updateState = dbGame.updateState;

export { goToGame, game, scores, updateState };