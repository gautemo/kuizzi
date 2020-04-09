import { ref, watchEffect } from "vue";
import { getQuiz, dbGame } from '@/utils/db'

const quizId = ref(null);
const quizName = ref('');
const questions = ref([]);

watchEffect(async () => {
  if(!quizId.value) return;
  const { name, questions: dbQuestions } = await getQuiz(quizId.value);
  quizName.value = name;
  questions.value = dbQuestions;
})

const addAnswer = (nr, alt, score) => {
  dbGame.answer(nr, alt, score)
}

export { quizId, questions, addAnswer }