/* https://www.youtube.com/watch?v=84mhLKUM04E */
/* Tid: 33:34 start på "Dispaly Todos from FireStore" */

/* https://firebase.google.com/docs/firestore/query-data/get-data?hl=en&authuser=0 */
/* https://console.firebase.google.com/u/0/project/diapal-firebase/firestore/data/~2Ftodos~2FRm14oBArm3XJHcASzoco */

<script lang="ts">
  import TodoItem from "../components/todoItem.vue";
</script>

<template>
  <main>
    <div class="top">
      <h1>Todos</h1>
      <form
        @submit.prevent="addTodo"
      >
        <input 
          v-model="newTodoContent" 
          type="text"
          class="todoInput" 
          placeholder="Add a todo"
        >
        <button 
          :disabled='!newTodoContent'
          class="todoButton"
        >Add</button>
      </form>
    </div>
    <div class="todos">
      <TodoItem :id="item.id" :todo="item.content" :done="item.done" :deleteFunction="deleteTodo" :toggelDone="toggelDone" v-for="item in todos"/>
    </div>
  </main>
  
</template>

<script setup lang="ts">

  /*imports*/
    import { ref, onMounted } from 'vue'
    import { 
      collection, 
      onSnapshot, 
      addDoc, 
      deleteDoc, 
      doc, 
      updateDoc, 
      query, 
      orderBy,
      
      /* Firestore Emulator */
      connectFirestoreEmulator
    } from "firebase/firestore";
    import { db, emulatorDB } from '@/firebase' 

  /* Firestore Emualtor */
  connectFirestoreEmulator(emulatorDB, 'localhost', 8080)

  /* 
    firebase refs
  */
  /* elmentorDB should be changed to db for production */
  const todosCollectionRef = collection(emulatorDB, "todos")
  const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

  /* todo items */
  const todos = ref([

  ]) as any

  /*add todo */
  const newTodoContent = ref() 

  const addTodo = () => {
    addDoc(todosCollectionRef, {
      content: newTodoContent.value,
      done: false, 
      date: Date.now()
    });
    newTodoContent.value = '' 
  }

  /* delete todo */
  const deleteTodo = (id: string) => {
    deleteDoc(doc(todosCollectionRef, id));
  }

  /* mark todo as done */
  const toggelDone = (id: string) => {
      const index = todos.value.findIndex((todo: { id: string; } ) => todo.id === id)

      updateDoc(doc(todosCollectionRef, id), {
        done: !todos.value[index].done
      })
  }

  /*
    get todos from firestore
  */

  onMounted(() => {
    onSnapshot(todosCollectionQuery, (querySnapshot:any) => {
      const fbTodos:any = []
      querySnapshot.forEach((doc:any) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done
        }
        fbTodos.push(todo)
      })
      todos.value = fbTodos
    }) 
  })
  
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  width: 100vw;
  height: 100vh;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top h1{
  text-align: center;
}

.top form {
  display: flex;
  gap: 0.5rem;
}

.todoInput{
  width: 20rem;
  height: 2.8rem;
  border-radius: .5rem;
  padding: 0.3rem;

  border: 2px solid lightgray;
  font-size: 1.25rem;
}

.todoInput:focus{
  outline: none;
  border: 2px solid gray;
}

.todoButton{
  width: 4rem;
  height: 3.5rem;
  border-radius: .5rem;
  font-size: 1.25rem;

  border: none;
  background-color: #005eff;
  color: #fff;
}

.todoButton:hover{
  cursor: pointer;
}

.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

</style>
