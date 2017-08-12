<template>
	<div>
		<input v-model="todo" type="text" />
		<input @click="addTodo" type="button" value="addTodo" />
	</div>
</template>

<script>
import {ADD_TODO} from "./store.js"
export default {
  name: 'addTodo',
  data() {
		return {
			todo: ""
		}
	},
	methods: {
		addTodo() {
			this.$store.commit(`todoList/${ADD_TODO}`, this.todo)
			this.todo = ""
		},
	}
}
</script>

<style>

</style>
