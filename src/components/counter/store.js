
export const INCREMENT = "INCREMENT"
export const ASYNC_INCREMENT = "ASYNC_INCREMENT"
export const DECREMENT = "DECREMENT"
export const ASYNC_DECREMENT = "ASYNC_DECREMENT"

export default {
	namespaced: true,
	state: {
		count: 0
	},
	mutations: {
		[INCREMENT](state) {
			state.count++
		},
		[DECREMENT](state) {
			state.count--
		}
	},
	actions: {
		[ASYNC_INCREMENT](context) {
			setTimeout(() => {
				context.commit(INCREMENT)
			}, 1000)
		},
		[ASYNC_DECREMENT](context) {
			setTimeout(() => {
				context.commit(DECREMENT)
			}, 1000)
		}
	}
}