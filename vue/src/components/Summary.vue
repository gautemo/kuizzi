<template>
  <section>
      <p>{{rank}}</p>
  </section>
</template>

<script>
import { me, scores } from '@/utils/game'
import { computed } from 'vue'

export default {
  props: {
    nr: Number,
  },
  setup(props){
    const rank = computed(() => {
      const meIndex = scores.value.findIndex(p => p.uid === me.uid);
      return `${format(meIndex+1)} of ${scores.value.length} players with a total of ${scores.value[meIndex].score} points`
    })

    return { rank }
  }
}

const suffixes = {
  'one': 'st',
  'two': 'nd',
  'few': 'rd',
  'other': 'th'
}

const pr = new Intl.PluralRules('en-US', {
    type: 'ordinal'
})
const format = (number) => `${number}${suffixes[pr.select(number)]}`
</script>

<style scoped>
section{
  position: absolute;
  bottom: 20px;
  padding: 0 15px;
  background: white;
  border-radius: 5px;
  margin: 0 50px;
  left: 0;
  right: 0;
}
</style>