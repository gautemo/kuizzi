<template>
  <main>
    <label>
      Question:
      <input type="text" v-model="text">
    </label>
    <label>
      Image:
      <input type="file" accept="image/*" ref="qImg">
    </label>
    <label>
      Is reveal:
      <input type="checkbox" v-model="reveal">
    </label>
    <label>
      A:
      <input type="checkbox" v-model="a.correct">
      <input type="text" v-model="a.text">
      <input type="file" accept="image/*" ref="aImg" @input="e => {if(e.target.files.length === 1){ a.text = '[image]' } }">
    </label>
    <label>
      B:
      <input type="checkbox" v-model="b.correct">
      <input type="text" v-model="b.text">
      <input type="file" accept="image/*" ref="bImg" @input="e => {if(e.target.files.length === 1){ b.text = '[image]' } }">
    </label>
    <label>
      C:
      <input type="checkbox" v-model="c.correct">
      <input type="text" v-model="c.text">
      <input type="file" accept="image/*" ref="cImg" @input="e => {if(e.target.files.length === 1){ c.text = '[image]' } }">
    </label>
    <label>
      D:
      <input type="checkbox" v-model="d.correct">
      <input type="text" v-model="d.text">
      <input type="file" accept="image/*" ref="dImg" @input="e => {if(e.target.files.length === 1){ d.text = '[image]' } }">
    </label>        
    <label>
      Time:
      <input type="number" v-model="time">
    </label>
    <button @click="add">Add</button>
  </main>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { addQuestion } from '@/utils/db'

export default {
  setup(){
    const text = ref('');
    const time = ref(20);
    const reveal = ref(false);

    const a = reactive({
      correct: false,
      text: '',
    })
    const b = reactive({
      correct: false,
      text: '',
    })
    const c = reactive({
      correct: false,
      text: '',
    })
    const d = reactive({
      correct: false,
      text: '',
    })            

    const qImg = ref(null)
    const aImg = ref(null)
    const bImg = ref(null)
    const cImg = ref(null)
    const dImg = ref(null)

    const add = () => {
      const imgs = {
        q: qImg.value.files.length === 1 ? qImg.value.files[0] : null,
        a: aImg.value.files.length === 1 ? aImg.value.files[0] : null,
        b: bImg.value.files.length === 1 ? bImg.value.files[0] : null,
        c: cImg.value.files.length === 1 ? cImg.value.files[0] : null,
        d: dImg.value.files.length === 1 ? dImg.value.files[0] : null,
      }

      const correct = [];
      if(a.correct) correct.push('a')
      if(b.correct) correct.push('b')
      if(c.correct) correct.push('c')
      if(d.correct) correct.push('d')

      const question = {
        text: text.value,
        time: time.value,
        isReveal: reveal.value,
        a: a.text,
        b: b.text,
        c: c.text,
        d: d.text,
        category: 'default',
        correct,
      }

      addQuestion('DyFjEBPPYbPu55CZBSXk', question, imgs)
    }

    return { text, time, qImg, reveal, a, aImg, b, bImg, c, cImg, d, dImg, add }
  }
}
</script>


<style scoped>
main{
  display: flex;
  flex-direction: column;
  margin: 50px;
}
</style>