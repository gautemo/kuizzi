<template>
  <section>
    <input type="text" v-model="quiz.name" class="name">
    <EditQuestion v-for="(question, i) in quiz.questions" :key="i" :question="question" />
    <button @click="newQuestion">New Question</button>
  </section>
</template>

<script>
import { reactive } from 'vue'
import { getQuiz } from '@/utils/userDb'
import { router } from '@/router';
import EditQuestion from '@/components/EditQuestion'

export default {
  async setup(){
    const quizId = router.currentRoute.value.params.id;
    const quiz = reactive(await getQuiz(quizId))

    const newQuestion = () => {
      quiz.questions.push({
        text: 'The question?',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: [],
        time: 20,
        image: '',
        isReveal: false,
      })
    }

    return { quiz, newQuestion }
  },
  components: { EditQuestion }
}
</script>

<style scoped>
section{
  padding: 25px;
}

.name{
  font-size: 1.5rem;
  width: 50%;
  padding: 5px;
}

button{
  display: block;
  font-size: 1.2rem;
  background: #333;
  color: white;
  box-shadow:inset 0px 45px 0px -30px #666666ce;
	cursor:pointer;
  padding: 5px 20px;
  margin: 10px 0;
  border: 1px solid rgb(161, 161, 161);
}
</style>