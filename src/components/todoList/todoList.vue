<template>
	<ul>
		<li @click="COMPLETED_TODO(item)" :class="{completed: item.completed}" v-for="(item, index) in FILTER_TODOS">{{item.text}}</li>
	</ul>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"
import {FILTER_TODOS, COMPLETED_TODO} from "./store.js"
export default {
  name: 'todoList',
  computed: {
  	...mapGetters("todoList", [FILTER_TODOS])
  },
  methods: {
  	...mapMutations("todoList", [COMPLETED_TODO])
  }
}
</script>

<style>

</style>
