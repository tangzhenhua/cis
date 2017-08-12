export const COMPLETED_TODO = "COMPLETED_TODO"
export const ADD_TODO = "ADD_TODO"
export const SET_FILTER = "SET_FILTER"
export const TOTAL_TODOS = "TOTAL_TODOS"
export const TOTAL_COMPLETED_TODOS = "TOTAL_COMPLETED_TODOS"
export const FILTER_TODOS = "FILTER_TODOS"


export default {
  namespaced: true,
	state: {
		todoList: [{
			text: "HTML1",
			completed: false
		}, {
			text: "CSS",
			completed: true
		}, {
			text: "JavaScript",
			completed: false
		}],
		filter: "all"
	},
	mutations: {
		[COMPLETED_TODO](state, item) {
			item.completed = !item.completed
		},
		[ADD_TODO](state, text) {
			state.todoList.push({
				text,
				completed: false
			})
		},
		[SET_FILTER](state, filter) {
			state.filter = filter
		}
	},
	getters: {
		[TOTAL_TODOS](state) {
			return state.todoList.length
		},
		[TOTAL_COMPLETED_TODOS](state) {
			return state.todoList.filter((item) => item.completed).length
		},
		[FILTER_TODOS](state) {
			switch (state.filter) {
				case "all":
					return state.todoList;
				case "completed":
					return state.todoList.filter((item) => item.completed)
				case "active":
					return state.todoList.filter((item) => !item.completed)
			}
		}
	}
}