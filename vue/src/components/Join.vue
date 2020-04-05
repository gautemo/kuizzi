<template>
<div>
  <section v-if="!form.savedName" class="section-name">
    <label>
      <span :class="{active: form.name || form.nameFocus}" class="fancyfont">Nickname</span>
      <input type="text" v-model="form.name" @focus="form.nameFocus = true" @blur="form.nameFocus = false" maxlength="25">
    </label>
    <span class="validation">{{form.nameNotValid}}</span>
    <button class="fancyfont" @click="form.savedName = true" :disabled="!form.name || form.nameNotValid.length > 0">Next</button>
  </section>
  <section v-else-if="!form.savedIcon">
    <label class="fancyfont">Chose your icon</label>
    <div class="select">
      <span class="icon" @click="form.icon = icon" :class="{selected: form.icon === icon}" v-for="icon in icons" :key="icon">{{icon}}</span>
    </div>
    <div class="buttons">
      <button class="fancyfont" @click="form.savedName = false">Back</button>
      <button class="fancyfont" @click="form.savedIcon = true" :disabled="!form.icon">Next</button>
    </div>
  </section>
  <section v-else-if="!form.savedColor">
    <label class="fancyfont">Chose your color</label>
    <div class="select colors">
      <span class="color" @click="form.color = color" :class="{selected: form.color === color}" v-for="color in colors" :key="color" :style="{background: color}"></span>
    </div>
    <div class="buttons">
      <button class="fancyfont" @click="form.savedIcon = false">Back</button>
      <button class="fancyfont" @click="form.savedColor = true" :disabled="!form.color">Next</button>
    </div>
  </section>
  <section v-else>
    <label class="fancyfont">Use this?</label>
    <div class="user-info">
      <span class="portrait" :style="{background: form.color}">{{form.icon}}</span>
      <span class="name">{{form.name}}</span>
    </div>
    <div class="buttons">
      <button class="fancyfont" @click="clear">No</button>
      <button class="fancyfont" @click="save">Yes</button>
    </div>
  </section>
</div>
</template>

<script>
import { game, addMe } from '@/utils/game'
import { reactive, computed, watch } from 'vue'
import { db } from '@/firebase'

const icons = [
  '😃', '🤣', '😇', '🥰', '🤩', '🤪', '🤑', '🤔', '😬', '🤥', '🥶', '🤠', '😎', '🤓', '😈',
  '💩', '🤡', '👻', '👽', '👾', '🤖', '🙈', '💥', '🖖', '🤙', '🙏', '🧠', '👶', '👨‍🚀', '🎅', '🧛', '🧟', '🦄', '🐗', '🦜', '🍕'
]

const colors = [
  '#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C', '#16A085', '#27AE60',
  '#2ECC71', '#F1C40F', '#F39C12', '#E67E22', '#ECF0F1', '#BDC3C7', '#95A5A6', '#7F8C8D',
  '#34495E', '#2C3E50',
]

const isNameTaken = name => game.value.players.some(p => p.name === name);

export default {
  setup(){
    const form = reactive({
      name: '',
      nameFocus: false,
      nameNotValid: computed(() => {
        if(isNameTaken(form.name)){
          return `Nickname is alrady taken in this game 😢`
        }
        return ''
      }),
      icon: '',
      color: '',
      savedName: false,
      savedIcon: false,
      savedColor: false,
    })

    let oldForm = localStorage.getItem('user');
    if(oldForm){
      oldForm = JSON.parse(oldForm);
      form.name = oldForm.name;
      form.icon = oldForm.icon;
      form.color = oldForm.color;
      form.savedName = true;
      form.savedIcon = true;
      form.savedColor = true;
    }

    const checkIfNameIsTaken = () => {
      if(form.name && form.savedName && isNameTaken(form.name)){
        form.savedName = false;
      }
    }
    watch(game, checkIfNameIsTaken);
    checkIfNameIsTaken();

    const save = () => {
      localStorage.setItem('user', JSON.stringify({...form}));
      addMe(form.name, form.icon, form.color);
    }

    const clear = () => {
      form.name = '';
      form.savedName = false;
      form.icon = '';
      form.savedIcon = false;
      form.color = '';
      form.savedColor = false;
    }

    return { form, icons, colors, save, clear }
  }
}

</script>

<style scoped>
section{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-name{
  margin: 0 50px;
}

section:not(.section-name) label,
section:not(.section-name) .buttons{
  margin: 0 50px;
}

label{
  position: relative;
}

label span{
  font-size: 1.3em;
  position: absolute;
  top: 5px;
  left: 5px;
  opacity: 0.6;
  transition: all 0.5s ease-in-out;
}

label span.active{
  opacity: 1;
  transform: translate(-5px, calc(-1.3em - 5px));
}

input{
  width: 100%;
  font-size: 1.3em;
  padding: 5px;
  box-sizing: border-box;
  font-family: inherit;
}

.buttons{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

button{
  font-size: 1.5em;
  margin: 15px 0;
  background: #333;
  color: white;
  box-shadow:inset 0px 45px 0px -30px #666666ce;
	cursor:pointer;
  padding: 10px 0;
  border: 1px solid rgb(161, 161, 161);
}

button:disabled{
  opacity: 0.7;
  cursor: auto;
}

.validation{
  color: rgb(172, 0, 0);
  margin-top: 5px;
}

label.fancyfont{
  font-size: 1.5em;
}

.select{
  display: grid;
  grid-template-columns: repeat(auto-fill, 70px);
  gap: 3px;
  justify-content: center;
  justify-items: center;
  max-height: 75vh;
  overflow: auto;
}

.icon, .color{
  font-size: 2em;
  padding: 5px;
  border: 3px solid transparent;
  border-radius: 5px;
  cursor: pointer;
}

.icon:hover,
.color:hover,
.icon:focus,
.color:focus{
  border: 3px solid rgba(255, 255, 255, 0.7);
}

.icon.selected{
  border: 3px solid rgb(255, 255, 255);
  background: rgba(21, 201, 21, 0.664);
}

.color{
  height: 50px;
  width: 50px;
  border: 6px solid transparent;
}

.color.selected{
  border: 6px solid rgba(21, 201, 21);
}

.select.colors{
  margin-top: 15px;
  gap: 10px;
}

.portrait{
  font-size: 3em;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-info{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name{
  font-size: 3em;
}
</style>
