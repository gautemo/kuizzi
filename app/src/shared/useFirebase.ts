import { tryOnScopeDispose } from '@vueuse/core'
import { DocumentData, DocumentReference, onSnapshot } from 'firebase/firestore'
import { computed, ref } from 'vue'

export async function useFirestore<T>(docRef: DocumentReference<DocumentData>, allowNotFound = false) {
  const isLoading = ref(true)
  const error = ref<Error>()
  const data = ref<T>()
  const unsubscribe = onSnapshot(docRef as DocumentReference<T>, doc => {
    isLoading.value = false
    data.value = doc.data()
    if(!allowNotFound && !data.value) error.value = new Error('document do not exists')
  })
  tryOnScopeDispose(unsubscribe)
  return {
    isLoading,
    error,
    data: computed(() => data.value)
  }
}
