<script setup lang="ts">
import { computed, ComputedRef, inject, ref } from 'vue'
import { Game, Player } from '../shared/types'
import AlertMessage from '../shared/AlertMessage.vue'
import UserIcon from '../shared/UserIcon.vue'
import { addPlayer } from './firebaseGame'

const game = inject('game') as ComputedRef<Game>
const players = inject('players') as ComputedRef<Player[]>

const savedUser = JSON.parse(localStorage.getItem('user') ?? 'null')

const name = ref(savedUser?.name)
const nameTaken = computed(() => Boolean(players.value.find(p => p.name === name.value)))
const icon = ref(savedUser?.icon)
const color = ref(savedUser?.color)
const step = ref(savedUser ? 3 : 0)

const icons = [
  '😃',
  '🤣',
  '😇',
  '🥰',
  '🤩',
  '🤪',
  '🤑',
  '🤔',
  '😬',
  '🤥',
  '🥶',
  '🤠',
  '😎',
  '🤓',
  '😈',
  '💩',
  '🤡',
  '👻',
  '👽',
  '👾',
  '🤖',
  '🙈',
  '💥',
  '🖖',
  '🤙',
  '🙏',
  '🧠',
  '👶',
  '👨‍🚀',
  '🎅',
  '🧛',
  '🧟',
  '🦄',
  '🐗',
  '🦜',
  '🍕',
]

const colors = [
  '#C0392B',
  '#E74C3C',
  '#f78fa6',
  '#9B59B6',
  '#8E44AD',
  '#2980B9',
  '#3498DB',
  '#1ABC9C',
  '#16A085',
  '#27AE60',
  '#2ECC71',
  '#F1C40F',
  '#F39C12',
  '#E67E22',
  '#ECF0F1',
  '#BDC3C7',
  '#95A5A6',
  '#7F8C8D',
  '#34495E',
  '#2C3E50',
]

const nextAfterIcon = ref<HTMLButtonElement>()
const nextAfterColor = ref<HTMLButtonElement>()

function save() {
  const user = {
    name: name.value,
    icon: icon.value,
    color: color.value,
  }
  localStorage.setItem('user', JSON.stringify(user))
  addPlayer(game.value.id, name.value, icon.value, color.value)
}
</script>

<template>
  <section v-if="step === 0 || nameTaken">
    <label class="fancy">
      <input type="text" v-model="name" autofocus maxlength="25" @keyup.enter="step++" />
      <span :class="{ active: name }">Name</span>
    </label>
    <AlertMessage v-if="nameTaken" type="warning" message="Name is already taken" />
    <button @click="step++" :disabled="!name || nameTaken" class="fancy">Next</button>
  </section>
  <section v-else-if="step === 1">
    <p>Chose your icon</p>
    <div class="select">
      <span
        class="icon"
        v-for="i in icons"
        :key="i"
        @click="icon = i"
        :class="{ selected: icon === i }"
        tabindex="0"
        @keyup.enter="
          icon = i
          nextAfterIcon?.focus()
        "
        >{{ i }}</span
      >
    </div>
    <div class="buttons">
      <button @click="step--" class="fancy">Back</button>
      <button @click="step++" :disabled="!icon" class="fancy" ref="nextAfterIcon">Next</button>
    </div>
  </section>
  <section v-else-if="step === 2">
    <p>Chose your color</p>
    <div class="select colors">
      <span
        class="color"
        v-for="c in colors"
        :key="c"
        @click="color = c"
        :class="{ selected: color === c }"
        :style="{ background: c }"
        @keyup.enter="
          color = c
          nextAfterColor?.focus()
        "
        tabindex="0"
      ></span>
    </div>
    <div class="buttons">
      <button @click="step--" class="fancy">Back</button>
      <button @click="step++" :disabled="!color" class="fancy" ref="nextAfterColor">Next</button>
    </div>
  </section>
  <section v-else>
    <p>Use this?</p>
    <div class="user-info">
      <UserIcon :icon="icon" :color="color" :size="100" />
      <span class="fancy">{{ name }}</span>
    </div>
    <div class="buttons">
      <button @click="step = 0" class="fancy">No</button>
      <button @click="save" class="fancy">Yes</button>
    </div>
  </section>
</template>

<style scoped>
label,
button,
input {
  width: 100%;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.select {
  display: grid;
  grid-template-columns: repeat(auto-fill, 70px);
  gap: 3px;
  justify-content: center;
  justify-items: center;
  max-height: 75vh;
  overflow: auto;
}

.icon,
.color {
  font-size: 2em;
  padding: 5px;
  border: 3px solid transparent;
  border-radius: 5px;
  cursor: pointer;
}

.icon:hover,
.color:hover,
.icon:focus {
  border: 3px solid rgba(255, 255, 255, 0.7);
}
.color:focus {
  border: 6px solid rgba(255, 255, 255, 0.7);
}

.icon.selected {
  border: 3px solid rgb(255, 255, 255);
  background: rgba(21, 201, 21, 0.664);
}

.color {
  height: 50px;
  width: 50px;
  border: 6px solid transparent;
}

.color.selected {
  border: 6px solid rgba(21, 201, 21);
}

.select.colors {
  margin-top: 15px;
  gap: 10px;
}

p {
  font-size: 1.2rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3em;
}
</style>
