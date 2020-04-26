<template>
  <div>
    <Header/>
    <section>
      <button @click="createQuiz">
        Create New Game
      </button>
      <ul>
        <li v-for="quiz in quizzes" :key="quiz.id">
          <span>{{quiz.name}}</span>
          <button @click="editQuiz(quiz.id)">Edit</button>
          <button @click="playQuiz(quiz.id)">Play</button>
        </li>
      </ul>
    </section>
    <Teleport to="#topright" v-if="isMounted">
      <span>{{email}}</span>
    </Teleport>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { isMounted as isMountedUtil } from '@/utils/isMounted'
import { getCurrentUser } from '@/firebase'
import { ref } from 'vue'
import { getUserQuizzes, createQuiz as createQuizDb, createGame } from '@/utils/userDb'
import { router } from '@/router';

export default {
  async setup(){
    const isMounted = isMountedUtil()

    const user = await getCurrentUser();
    const email = ref(user.email);

    const quizzes = ref(await getUserQuizzes(user.uid));

    const createQuiz = async () => {
      const id = await createQuizDb(user.uid);
      router.push(`/my-games/${id}`);
    }

    const editQuiz = id => router.push(`/my-games/${id}`)
    const playQuiz = async quizId => {
      const pin = await createGame(quizId);
      router.push(`/host/${pin}`);
    }

    return { email, isMounted, quizzes, editQuiz, playQuiz, createQuiz }
  },
  components: { Header }
}
</script>

<style scoped>
section{
  margin: 25px;
}

button{
  display: block;
  font-size: 1.5em;
  background: #333;
  color: white;
  box-shadow:inset 0px 45px 0px -30px #666666ce;
	cursor:pointer;
  padding: 10px 50px;
  border: 1px solid rgb(161, 161, 161);
}

ul{
  list-style: none;
  padding: 0;
}

li{
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
}

li span{
  font-size: 1.3rem;
  flex: 1;
}

li button{
  margin: 5px;
  font-size: 1.3rem;
}

</style>