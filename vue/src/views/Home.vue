<template>
  <div>
    <Header/>
    <h1>A quiz game for your friends!</h1>
    <label>
      <span :class="{active: game.pin || game.pinFocus}" class="fancyfont">Game PIN</span>
      <input type="text" v-model="game.pin" @focus="game.pinFocus = true" @blur="game.pinFocus = false" maxlength="25" @keyup.enter="enter">
    </label>
    <button class="fancyfont" @click="enter" :disabled="!game.pin">Enter</button>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { reactive } from 'vue'

export default {
  setup(){
    const game = reactive({
      pin: '',
      pinFocus: false,
    });

    const enter = () => {

    }

    return { game, enter }
  },
  components: { Header }
}
</script>

<style scoped>
div{
  text-align: center;
}

label{
  position: relative;
}

label span{
  font-size: 1.3em;
  position: absolute;
  top: 0;
  left: 5px;
  opacity: 0.6;
  transition: all 0.5s ease-in-out;
}

label span.active{
  opacity: 1;
  transform: translate(-5px, calc(-1.3em - 15px));
}

input{
  font-size: 1.3em;
  margin-top: 50px;
  padding: 5px;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
}

button{
  display: block;
  font-size: 1.5em;
  margin: 15px auto;
  background: #333;
  color: white;
  box-shadow:inset 0px 45px 0px -30px #666666ce;
	cursor:pointer;
  padding: 10px;
  border: 1px solid rgb(161, 161, 161);
}

input, button{
  width: 200px;
}

button:disabled{
  opacity: 0.7;
  cursor: auto;
}
</style>