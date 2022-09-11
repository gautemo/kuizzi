<script setup lang="ts">
  import { computed, ComputedRef, inject, ref } from 'vue';
  import CountDown from '../shared/CountDown.vue';
  import { Game } from '../shared/types';
  import RevealBlocks from '../shared/RevealBlocks.vue';
  import ImageComponent from '../shared/ImageComponent.vue';
  import { ImageUtil } from '../shared/imageUtil';
  import { addAnswer } from './firebaseGame';
    
  const game = inject('game') as ComputedRef<Game>
  
  const started = ref(false)
  
  const question = computed(() => game.value.quiz.questions[game.value.question-1])

  function answer(alternative: 'a'|'b'|'c'|'d'){
    addAnswer(game.value.id, game.value.question, alternative)
  }
  </script>
  
  <template>
    <section v-if="!started" class="splash fancy">
      <div>
        <p>Get Ready!</p>
        <CountDown @done="started = true" :from="3" />
      </div>
    </section>
    <section v-else class="game">
      <div class="top">
        <div class="q-img" v-if="question.img">
          <ImageComponent :value="question.img" alt="Question image" />
          <RevealBlocks v-if="question.isReveal" />
        </div>
        <h1>{{question.text}}</h1>
        <CountDown :from="question.time"/>
      </div>
      <div class="alternatives" :class="{'two-rows': question.c}">
        <button class="a" @click="answer('a')">
          <ImageComponent v-if="ImageUtil.hasImage(question.a)" :value="question.a" alt="Alternative A"/>
          <p>{{question.a}}</p>
        </button>
        <button class="b" @click="answer('b')">
          <ImageComponent v-if="ImageUtil.hasImage(question.b)" :value="question.b" alt="Alternative B"/>
          <p>{{question.b}}</p>
        </button>
        <button class="c" @click="answer('c')">
          <ImageComponent v-if="ImageUtil.hasImage(question.c)" :value="question.c" alt="Alternative C"/>
          <p>{{question.c}}</p>
        </button>
        <button class="d" @click="answer('d')">
          <ImageComponent v-if="ImageUtil.hasImage(question.d)" :value="question.d" alt="Alternative D"/>
          <p>{{question.d}}</p>
        </button>
      </div>
    </section>
    <section>
  
    </section>
  </template>
  
  <style scoped>
  .splash {
    height: 100%;
    display: grid;
    place-items: center;
    text-align: center;
    font-size: 2rem;
  }
  
  .game {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }
  
  .top {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
  }
  
  h1 {
    font-size: 1.2rem;
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
  
  .alternatives{
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr 1fr;
  }
  
  .alternatives.two-rows{
    grid-template-rows: 1fr 1fr;
  }
  
  button {
    border: none;
    border-radius: 8px;
    padding: 5px;
    display: grid;
    place-items: center;
    box-shadow: 0 2px 2px 1px #626262c7;
  }
  
  .alternatives p {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-align: center;
  }
  </style>