<template>
  <Suspense>
    <template #default>
      <slot></slot>
    </template>
    <template #fallback>
      <span class="loader"></span>
    </template>
  </Suspense>
</template>

<style scoped>
  .loader {
    position: absolute;
    inset: 0;
    margin: auto;
  }
</style>