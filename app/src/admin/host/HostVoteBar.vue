<script setup lang="ts">
import { computed, ComputedRef, inject, onMounted, ref } from 'vue'
import { Game, Player } from '../../shared/types'
import UserIcon from '../../shared/UserIcon.vue'
import ImageComponent from '../../shared/ImageComponent.vue'
import { ImageUtil } from '../../shared/imageUtil'

const props = defineProps<{
  alternative: 'a' | 'b' | 'c' | 'd'
}>()

const game = inject('game') as ComputedRef<Game>
const players = inject('players') as ComputedRef<Player[]>
const question = computed(() => game.value.quiz.questions[game.value.question - 1])

const playersOnBar = computed(() => players.value.filter(p => p[game.value.question] === props.alternative))

const barwrap = ref<HTMLElement>()
const height = ref('1px')
onMounted(() =>
  setTimeout(() => {
    height.value = (playersOnBar.value.length / players.value.length) * barwrap.value!.clientHeight + 'px'
  }, 500),
)
const show = ref(false)
onMounted(() => {
  setTimeout(() => (show.value = true), 1700)
})
</script>

<template>
  <div class="container" v-if="question[props.alternative]" :class="props.alternative">
    <div ref="barwrap" class="bar-wrap">
      <div class="bar">
        <template v-for="player of playersOnBar" :key="player.id">
          <Transition>
            <UserIcon v-if="show" :icon="player.icon" :color="player.color" :size="Math.max(60 - players.length, 35)" />
          </Transition>
        </template>
      </div>
    </div>
    <div class="alt">
      <ImageComponent
        v-if="ImageUtil.hasImage(question[props.alternative])"
        :value="question[props.alternative]"
        :alt="`Image alternative ${props.alternative}`"
      />
      <span v-else>{{ question[props.alternative] }}</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}

.bar-wrap {
  height: 100%;
  display: grid;
  align-items: end;
}

.bar {
  width: 100%;
  height: v-bind(height);
  border-radius: 15px 15px 0 0;
  transition: height 1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  overflow: hidden;
}

.a .bar {
  background: var(--red);
}

.b .bar {
  background: var(--blue);
}

.c .bar {
  background: var(--yellow);
}

.d .bar {
  background: var(--green);
}

.alt {
  min-height: 100px;
  padding: 10px;
  display: flex;
  align-items: flex-end;
}

.a .alt {
  background: linear-gradient(0deg, white 10%, #f99298 85%, var(--red) 100%);
}

.b .alt {
  background: linear-gradient(0deg, white 10%, #4f84c5 85%, var(--blue) 100%);
}

.c .alt {
  background: linear-gradient(0deg, white 10%, #d3af63 85%, var(--yellow) 100%);
}

.d .alt {
  background: linear-gradient(0deg, white 10%, #64a354 85%, var(--green) 100%);
}

.alt img {
  max-height: 60px;
  max-width: 60px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
