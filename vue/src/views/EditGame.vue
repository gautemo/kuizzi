<template>
  <Header/>
  <section>
    <input type="text" v-model="quiz.name" class="name">
    <EditQuestion v-for="(question, i) in quiz.questions" :key="i" :questionProp="question" v-on:update="q => update(i, q)"/>
    <div>
      <button @click="newQuestion">New Question</button>
      <button @click="save">Save</button>
    </div>
  </section>
  <Teleport to="#topright" v-if="isMounted">
      <router-link to="/my-games" class="my-games fancyfont">My Games</router-link>
    </Teleport>
</template>

<script>
import { reactive } from 'vue'
import { getQuiz, updateQuiz } from '@/utils/userDb'
import { router } from '@/router';
import EditQuestion from '@/components/EditQuestion'
import Header from '@/components/Header'
import { isMounted as Mounted } from '@/utils/isMounted'

export default {
  async setup(){
    const isMounted = Mounted();

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
        isReveal: false,
      })
    }

    const update = (index, question) => quiz.questions[index] = question;

    const save = () => updateQuiz(quizId, quiz);

    return { quiz, newQuestion, save, update, isMounted }
  },
  components: { EditQuestion, Header }
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
  display: inline-block;
  font-size: 1.2rem;
  background: #333;
  color: white;
  box-shadow:inset 0px 45px 0px -30px #666666ce;
	cursor:pointer;
  padding: 5px 20px;
  margin: 10px 10px 10px 0;
  border: 1px solid rgb(161, 161, 161);
}
</style>