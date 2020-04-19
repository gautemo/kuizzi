<template>
  <details>
    <summary><input type="text" v-model="question.text"></summary>
    <label>
      <span class="prop">Time:</span>
      <input type="number" v-model="question.time" class="time">
    </label>
    <div class="label">
      <span class="prop">Image:</span>
      <label v-if="!qImgSrc" class="img"><input type="file" accept="image/*" ref="qImg" @input="qImgSrc = getSrc(qImg)"></label>
      <div v-else @click.prevent class="q-img">
        <img :src="qImgSrc"/>
        <RevealBlocks v-if="question.isReveal" />
        <button @click.prevent="qImgSrc = ''">❌</button>
      </div>
    </div>
    <label v-if="qImgSrc">
      <span class="prop">Reveal:</span>
      <input type="checkbox" v-model="question.isReveal">
    </label>
    <label>
      <span class="a">A</span>
      <input type="text" v-model="question.a">
      <input type="file" accept="image/*" ref="aImg">
      <input type="checkbox" v-model="correct.a" title="correct">
    </label>
    <label>
      <span class="b">B</span>
      <input type="text" v-model="question.b">
      <input type="file" accept="image/*" ref="bImg">
      <input type="checkbox" v-model="correct.b" title="correct">
    </label>
    <label>
      <span class="c">C</span>
      <input type="text" v-model="question.c">
      <input type="file" accept="image/*" ref="cImg">
      <input type="checkbox" v-model="correct.c" title="correct">
    </label>
    <label>
      <span class="d">D</span>
      <input type="text" v-model="question.d">
      <input type="file" accept="image/*" ref="dImg">
      <input type="checkbox" v-model="correct.d" title="correct">
    </label>        
  </details>
</template>

<script>
import { reactive, ref } from 'vue'
import RevealBlocks from '@/components/questions/RevealBlocks'

export default {
  props: {
    question: Object,
  },
  setup(){
    const correct = reactive({
      a: false,
      b: false,
      c: false,
      d: false,
    })

    const qImg = ref(null)
    const aImg = ref(null)
    const bImg = ref(null)
    const cImg = ref(null)
    const dImg = ref(null)

    const qImgSrc = ref('')

    const getSrc = imgRef => URL.createObjectURL(imgRef.files[0]);

    return { correct, qImg, aImg, bImg, cImg, dImg, qImgSrc, getSrc }
  },
  components: { RevealBlocks }
}
</script>

<style scoped>
.alternative{
  display: block;
  margin: 5px;
}

details{
  margin: 15px 0;
  padding-bottom: 5px;
  border-bottom: 3px solid black;
}

summary{
  display: flex;
  align-items: center;
}

summary input{
  font-size: 1.5rem;
  flex: 1;
}

label, .label{
  display: flex;
  align-items: center;
  margin: 5px 0;
}

label span, .label span{
  display: inline-block;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 5px;
}

.a{
  background: var(--red);
}

.b{
  background: var(--blue);
}

.c{
  background: var(--yellow);
}

.d{
  background: var(--green);
}

.prop{
  width: 40px;
}

input[type=checkbox] {
  width: 25px;
  height: 25px;
}

label input[type=text]{
  font-size: 1.2rem;
  flex: 1;
}

input[type=number]{
  font-size: 1.2rem;
}

.time{
  width: 50px;
}

.img{
  position: relative;
}

.img input{
  opacity: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.img::before{
  content: "";
  height: 70px;
  width: 70px;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBkPSJNMzY4LDIyNGMyNi41LDAsNDgtMjEuNSw0OC00OGMwLTI2LjUtMjEuNS00OC00OC00OGMtMjYuNSwwLTQ4LDIxLjUtNDgsNDhDMzIwLDIwMi41LDM0MS41LDIyNCwzNjgsMjI0eiIvPjxwYXRoIGQ9Ik00NTIsNjRINjBjLTE1LjYsMC0yOCwxMi43LTI4LDI4LjN2MzI3LjRjMCwxNS42LDEyLjQsMjguMywyOCwyOC4zaDM5MmMxNS42LDAsMjgtMTIuNywyOC0yOC4zVjkyLjMgICBDNDgwLDc2LjcsNDY3LjYsNjQsNDUyLDY0eiBNMzQ4LjksMjYxLjdjLTMtMy41LTcuNi02LjItMTIuOC02LjJjLTUuMSwwLTguNywyLjQtMTIuOCw1LjdsLTE4LjcsMTUuOGMtMy45LDIuOC03LDQuNy0xMS41LDQuNyAgIGMtNC4zLDAtOC4yLTEuNi0xMS00LjFjLTEtMC45LTIuOC0yLjYtNC4zLTQuMUwyMjQsMjE1LjNjLTQtNC42LTEwLTcuNS0xNi43LTcuNWMtNi43LDAtMTIuOSwzLjMtMTYuOCw3LjhMNjQsMzY4LjJWMTA3LjcgICBjMS02LjgsNi4zLTExLjcsMTMuMS0xMS43aDM1Ny43YzYuOSwwLDEyLjUsNS4xLDEyLjksMTJsMC4zLDI2MC40TDM0OC45LDI2MS43eiIvPjwvZz48L3N2Zz4=");
  background-size: 70px;
  background-repeat: no-repeat;
  background-position: center;
  padding: 3px;
  opacity: 0.8;
  border: 3px solid transparent;
  border-radius: 5px;
}

.img:hover::before{
  opacity: 1;
  border: 3px solid var(--green);
}

.q-img{
  position: relative;
}

.q-img img{
  max-height: 40vh;
  max-width: 50vw;
}

.q-img button{
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  padding-bottom: 5px;
}

.q-img button:hover{
  background: rgba(255, 255, 255);
}
</style>