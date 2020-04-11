<template>
  <div class="container" v-if="alt">
    <div class="bar" :style="heightStyle" :class="{'hide-content': !show}">
      <Portrait v-for="player in players" :key="player.uid" :icon="player.icon" :color="player.color" size="60"/>
    </div>
    <div class="alt">
      <span v-if="!alt.startsWith('[image]')">{{alt}}</span>
      <AltImg :alternative="alt" pad="5" class="alt-img"/>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Portrait from '@/components/Portrait'
import AltImg from '@/components/AltImg'

export default {
  props: {
    alt: String,
    players: Array,
    total: Number,
  },
  setup({players, total}){
    const heightStyle = ref({
      height: '10px'
    })

    onMounted(() => {
      setTimeout(() => heightStyle.value.height = `${(players.length / total)*50}vh`, 500)
    })

    const show = ref(false);

    onMounted(() => {
      setTimeout(() => show.value = true, 1700)
    })

    return { heightStyle, show }
  },
  components: { Portrait, AltImg }
}
</script>

<style scoped>
.bar{
  width: 100%;
  border-radius: 25px 25px 0 0;
  transition: height 1s ease-in-out;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 5px;
  box-sizing: border-box;
}

.red .bar{
  background: var(--red);
}

.blue .bar{
  background: var(--blue);
}

.yellow .bar{
  background: var(--yellow);
}

.green .bar{
  background: var(--green);
}

.alt{
  min-height: 100px;
  padding: 10px;
  display: flex;
  align-items: flex-end;
}

.red .alt{
  background: linear-gradient(0deg, white 10%, #f99298 85%, var(--red) 100%);
}

.blue .alt{
  background: linear-gradient(0deg, white 10%, #4f84c5 85%, var(--blue) 100%);
}

.yellow .alt{
  background: linear-gradient(0deg, white 10%, #d3af63 85%, var(--yellow) 100%);
}

.green .alt{
  background: linear-gradient(0deg, white 10%, #64a354 85%, var(--green) 100%);
}

.hide-content > *{
  opacity: 0;
}

.bar > * {
  transition: opacity 1s ease-in-out;
  margin: 15px;
}

.alt-img{
  max-height: 60px;
  max-width: 60px;
}
</style>