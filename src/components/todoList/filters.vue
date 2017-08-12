<template>
	<div class="filter">
		show: 
		<div v-for="(item, index) in filterNames">
			<span v-if="item === filter">{{item}}</span>
			<a href="#" @click.prevent="SET_FILTER(item)" v-else>{{item}}</a>
		</div>
		<div>{{TOTAL_COMPLETED_TODOS}}/{{TOTAL_TODOS}}</div>
	</div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from "vuex"
import {TOTAL_TODOS, TOTAL_COMPLETED_TODOS, SET_FILTER} from "./store.js"
export default {
	name: 'filters',
	data() {
		return {
			filterNames: ["all", "completed", "active"]
		}
	},
	computed: {
		...mapState("todoList", ["filter"]),
		...mapGetters("todoList", [TOTAL_TODOS, TOTAL_COMPLETED_TODOS])
	},
	methods: {
		...mapMutations("todoList", [SET_FILTER])
	}
}
</script>

<style>

</style>
