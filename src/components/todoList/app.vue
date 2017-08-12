<template>
	<div>
		<add-todo />
		<todo-list />
		<filters />
	</div>
</template>

<script>
import addTodo from "./addTodo.vue"
import todoList from "./todoList.vue"
import filters from "./filters.vue"

export default {
  name: 'app',
	components: {
		addTodo,
		todoList,
		filters
	}
}
</script>

<style>

</style>
