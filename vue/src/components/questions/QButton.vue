<template>
  <button v-if="alternative" :class="nr">{{alternative}}</button>
</template>

<script>
export default {
  props: ['alternative', 'nr'],
}
</script>

<style scoped>
.one{
  background: #f4303c;
}

.two{
  background: #0a65d3;
}

.three{
  background: #df9900;
}

.four{
  background: #227e0a;
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
}
</style>