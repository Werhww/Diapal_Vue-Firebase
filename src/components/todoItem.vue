
<script lang="ts">
    export default {
        props: ['todo', 'id', 'deleteFunction', 'done', 'markdone'],
    }
</script>

<template>
<div :id="id" class="todo-card" :class="{ 'background-success-light' : done}">
    <p :class="{ 'text-success' : done}">{{ todo }}</p>
    <div>
        <button class="button light" @click="markdone(id)"
          :class="{ 'button-success' : done}">&check;</button>
        <button class="button danger" @click="deleteFunction(id)">&cross;</button>
    </div>
</div>
</template>



<style scoped>
/* Css to todo items */
.todo-card{
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 24rem;
  height: 4rem;
  border-radius: .5rem;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  padding: 0 1rem;
}

.todo-card div{
  display: flex;
  gap: .5rem;
}


.button {
  width: 3rem;
  height: 3rem;
  border-radius: .5rem;
  border: none;
  outline: none;

  font-size: 1.5rem;
}

.button:hover{
  cursor: pointer;
}

.light{
  background-color: #e9e9e9;
}

.danger{
  background-color: #c21f1f;
  color: white;
}

.background-success-light{
  background-color: #cdfecc;
}

.button-success{
  background-color: darkgreen;
  color: white;
}

.text-success{
  color: darkgreen;
  text-decoration: line-through;
}
</style>