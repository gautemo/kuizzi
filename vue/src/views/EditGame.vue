<template>
  <Header/>
  <section>
    <input type="text" v-model="quiz.name" class="name">
    <div v-for="(question, i) in quiz.questions" :key="question.id" class="question">
      <div class="zone" v-show="i === 0" @dragenter="dragTo = 0" :class="{active: dragTo === 0, show: isDragging !== -1}" @drop="dropped" @dragover.prevent></div>
      <div draggable="true" @dragstart="isDragging = i" @dragend="isDragging = -1" class="flex">
        <EditQuestion :questionProp="question" v-on:update="q => update(q)" class="grow"/>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      </div>
      <div class="zone" @dragenter="dragTo = i+1" :class="{active: dragTo === i + 1, show: isDragging !== -1}" @drop="dropped" @dragover.prevent></div>
    </div>
    <div>
      <button @click="newQuestion">New Question</button>
      <button @click="save" :disabled="!changed">Save</button>
    </div>
  </section>
  <Teleport to="#topright" v-if="isMounted">
      <router-link to="/my-games" class="my-games fancyfont">My Games</router-link>
    </Teleport>
</template>

<script>
import { reactive, ref, watch, onUnmounted } from 'vue'
import { getQuiz, updateQuiz } from '@/utils/userDb'
import { router, onBeforeRouteLeave } from '@/router';
import EditQuestion from '@/components/EditQuestion'
import Header from '@/components/Header'
import { isMounted as Mounted } from '@/utils/isMounted'

export default {
  async setup(){
    const timestamp = Date.now();
    const isMounted = Mounted();
    const changed = ref(false);

    onBeforeRouteLeave(function(to, from, next) {
      if (!changed.value || window.confirm('Leave without saving?')){
        next()
      }
      else {
        next(false)
      }
    })

    const confirmLeave = event => {
      if(changed.value){
        event.preventDefault();
        event.returnValue = 'Leave without saving?';
        return 'Leave without saving?';
      }
    }

    window.addEventListener('beforeunload', confirmLeave);

    onUnmounted(() => {
      window.removeEventListener('beforeunload', confirmLeave);
    })

    const quizId = router.currentRoute.value.params.id;
    const quiz = reactive(await getQuiz(quizId))

    watch(() => quiz.name, () => {
      changed.value = true
    })

    const newQuestion = () => {
      quiz.questions.push({
        id: Date.now(),
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

    const update = (question) => {
      if(Date.now() - timestamp < 1000){
        return;
      }
      const index = quiz.questions.findIndex(q => q.id === question.id);
      quiz.questions[quiz.questions.findIndex(q => q.id === question.id)] = question;
      changed.value = true;
    }

    const save = () => {
      updateQuiz(quizId, quiz);
      changed.value = false;
    }

    const isDragging = ref(-1);
    const dragTo = ref(-1);
    const dropped = () => {
      let to = dragTo.value;
      if(isDragging.value < to){
        to = Math.max(0, to - 1);
      }
      quiz.questions.splice(to, 0, quiz.questions.splice(isDragging.value, 1)[0]);
      isDragging.value = -1;
      dragTo.value = -1;
    }

    return { quiz, newQuestion, save, update, isMounted, changed, isDragging, dragTo, dropped }
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
  margin-bottom: 15px;
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

button:disabled{
  opacity: 0.7;
  cursor: auto;
}

.zone{
  width: 100%;
  height: 0px;
  border-radius: 2px;
  background: rgba(51, 51, 51, 0.2);
  transition: height 0.5s ease-in-out;
}

.zone.show{
  height: 40px;
}

.zone.active{
  background: rgba(40, 170, 1, 0.5);
}

.question{
  margin: 10px 0;
}

.flex{
  display: flex;
  align-items: center;
}

.grow{
  flex: 1;
}

svg{
  cursor: grab;
  align-self: flex-start;
  margin-top: 15px;
}
</style>