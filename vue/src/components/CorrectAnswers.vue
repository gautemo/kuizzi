<template>
  <div>
    <b>Correct Answer:</b>
    <div class="flex">
      <p v-for="answer in correctAnswers" :key="answer.alt" class="correct" :class="answer.alt">
        <span v-if="!answer.text.startsWith('[image]')">{{answer.text}}</span>
        <AltImg :alternative="answer.text" pad="5" class="alt-img"/>
      </p>
    </div>
  </div>  
</template>

<script>
import { computed } from 'vue';
import AltImg from '@/components/AltImg'

export default {
  props:{
    question: Object,
  },
  setup({question}){
    const correctAnswers = computed(() => question.correct.map(c => ({ text: question[c], alt: c })));

    return { correctAnswers }
  },
  components: { AltImg }
}
</script>

<style scoped>
p{
  margin: 3px 0;
}

.correct{
  color: white;
  font-size: 1.2em;
  display: inline-block;
  border-radius: 5px;
  padding: 3px 10px;
  min-width: 100px;
}

.correct:not(:last-child){
  margin-right: 10px;
}

.correct.a{
  background: var(--red);
}

.correct.b{
  background: var(--blue);
}

.correct.c{
  background: var(--yellow);
}

.correct.d{
  background: var(--green);
}

.alt-img{
  max-height: 100px;
  max-width: 100px;
}

.flex{
  display: flex;
  flex-wrap: wrap;
}
</style>