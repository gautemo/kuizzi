import { ref, computed } from 'vue'
import { dbGame } from '@/utils/db'
import { sortedPlayers } from '@/utils/helper'

const game = ref({
    players: [],
    question: 0,
    state: '',
    quiz: {
        owner: '',
        name: '',
        questions: [],
    },
});

const questions = computed(() => game.value.quiz.questions);
const currentQuestion = computed(() => game.value.quiz.questions[game.value.question - 1]);

const scores = computed(() => sortedPlayers(game.value))

const goToGame = (id, callback) => {
    dbGame.setGame(id);
    dbGame.listen(async data => {
        if(!data){
            alert('Game PIN does not exist');
            location.href = '/';
            return;
        }
        game.value = data;

        if(callback){
            callback(data)
        }
    })
}

const updateState = dbGame.updateState;

const addAnswer = (alt, score) => {
    dbGame.answer(game.value.question, alt, score)
}

export { goToGame, game, scores, updateState, questions, currentQuestion, addAnswer };