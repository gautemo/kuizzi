<template>
  <button v-if="alternative" :class="nr">
    <span v-if="!alternative.startsWith('[image]')">{{alternative}}</span>
    <AltImg :alternative="alternative" pad="10"/>
  </button>
</template>

<script>
import { getImgUrl } from '@/utils/db'
import { ref } from 'vue'
import AltImg from '@/components/AltImg'

export default {
  props: ['alternative', 'nr'],
  components: { AltImg }
}
</script>

<style scoped>
.one{
  background: var(--red);
}

.two{
  background: var(--blue);
}

.three{
  background: var(--yellow);
}

.four{
  background: var(--green);
}

button{
  color: white;
  border: 1px solid rgb(161, 161, 161);
  font-size: 2em;
  font-family: inherit;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  max-width: 100%;
  word-wrap: break-word;
  height: 100%;
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  button{
    font-size: 1.7em;
  }
}
</style>