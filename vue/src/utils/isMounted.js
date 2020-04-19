import { ref, onMounted } from "vue"

const isMounted = () => {
  const isMounted = ref(false)
  onMounted(() => isMounted.value = true)

  return isMounted;
}

export { isMounted }