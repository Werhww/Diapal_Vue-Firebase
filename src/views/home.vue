<script setup lang="ts">
import TodoItem from "../components/todoItem.vue";
import { 
  onAuthStateChanged
} from 'firebase/auth'

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
} from "firebase/firestore";

import { auth, db } from '@/firebase' 

/* firebase refs */
const todosCollectionRef = collection(db, "todos")
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

/* get todos from firestore */
onMounted(() => {
  try {
    onSnapshot(todosCollectionQuery, (querySnapshot:any) => {
      const TodoList:any = []
      querySnapshot.forEach((doc:any) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done
        }
        TodoList.push(todo)
      })
      todos.value = TodoList
    })
  } catch (error) {
    console.log('Loggin needed')
  }
})

const loggedIn = ref(false)

onAuthStateChanged(auth, (user)=>{
  if(user){
    loggedIn.value = true
  } else{
    loggedIn.value = false
  }
})


</script>

<template>
  <main>
    <div class="top" v-if="loggedIn">
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
    <div class="todos" v-if="loggedIn">
      <TodoItem :id="item.id" :todo="item.content" :done="item.done" :deleteFunction="deleteTodo" :toggelDone="toggelDone" v-for="item in todos"/>
    </div>
    <div v-if="!loggedIn">
      <h1>You need to be logged in to see your todos</h1>
    </div>
  </main>
</template>

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
