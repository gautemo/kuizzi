import { tryOnScopeDispose } from '@vueuse/core'
import { Query, DocumentData, DocumentReference, onSnapshot, doc } from 'firebase/firestore'
import { computed, ref } from 'vue'

export function useFirestore<T extends { id: string }>(
  docRef: DocumentReference<DocumentData>, 
  allowNotFound = false
) {
  const isLoading = ref(true)
  const error = ref<Error>()
  const data = ref<T>()
  const unsubscribe = onSnapshot(docRef, doc => {
    isLoading.value = false
    const docData = doc.data()
    if(docData){
      data.value = { id: doc.id, ...docData } as T
    }else{
      data.value = undefined
    }
    if(!allowNotFound && !data.value) error.value = new Error('document do not exists')
  }, (err) => {
    error.value = err
    isLoading.value = false
  })
  tryOnScopeDispose(unsubscribe)
  return {
    isLoading,
    error,
    data: computed(() => data.value)
  }
}

export function useFirestoreList<T extends { id: string }>(query: Query<DocumentData>) {
  const isLoading = ref(true)
  const error = ref<Error>()
  const data = ref<T[]>()
  const unsubscribe = onSnapshot(query, snapshot => {
    isLoading.value = false
    data.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
  }, (err) => {
    error.value = err
    isLoading.value = false
  })
  tryOnScopeDispose(unsubscribe)
  return {
    isLoading,
    error,
    data: computed(() => data.value)
  }
}