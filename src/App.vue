/* https://www.youtube.com/watch?v=84mhLKUM04E */
/* Tid: 33:34 start på "Dispaly Todos from FireStore" */


<script lang="ts">
  import TodoItem from "./components/todoItem.vue";
</script>

<template>
  <main>
    <div class="top">
      <h1>Todos</h1>
      <div>
        <input type="text" id="" class="todoInput" placeholder="Add a todo">
        <button class="todoButton" v-on:click="addTodo">Add</button>
      </div>
    </div>
    <div class="todos">
      <TodoItem :id="item.id" :todo="item.content" :done="item.done" :deleteFunction="deleteTodo" :markdone="markDone" v-for="item in todos"/>
    </div>
  </main>
</template>

<script setup lang="ts">
  /*imports*/
  import { ref } from 'vue'
  import { collection, getDocs } from 'firebase/firestore'
  import { db } from '@/firebase'

  /* todo items */
  const todos = ref([
  
    {
      id: "id1",
      content: "hello",
      done: false
    },
    {
      id: "id2",
      content: "world",
      done: false
    },
    {
      id: "id3",
      content: "wash hands",
      done: false
    } 
  ])

  /*add todo */
  const addTodo = () => {
    const input = document.querySelector(".todoInput") as HTMLInputElement;
    const todo = input.value;
    if(todo){
      todos.value.push({
        id: 'uuidv4()',
        content: todo,
        done: false
      })
      input.value = "";
    }
  }

  /* delete todo */
  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter(todo => todo.id !== id);
  }

  /* mark todo as done */
  const markDone = (id: string) => {
    todos.value.filter(todo => todo.id == id)[0].done? 
      todos.value.filter(todo => todo.id == id)[0].done = false:
      todos.value.filter(todo => todo.id == id)[0].done = true;
  }
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

  .top div {
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
