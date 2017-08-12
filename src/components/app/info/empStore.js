export const GET_EMP_BY_PAGE = "GET_EMP_BY_PAGE"
export const ASYNC_GET_EMP_BY_PAGE = "ASYNC_GET_EMP_BY_PAGE"

import axios from "axios"

export default {
	namespaced: true,
	state: {
		page: {
			curPage: 1,
			eachPage: 10,
			maxPage: 0,
			data: []
		}
	},
	mutations: {
		[GET_EMP_BY_PAGE](state, page) {
			state.page = page
		}
	},
	actions: {
		async [ASYNC_GET_EMP_BY_PAGE](context, {curPage = 1, eachPage = 10} = {}) {
			const {
				data
			} = await axios.get("http://localhost:3001/emp/getEmpByPage", {
				params: {
					curPage,
					eachPage
				}
			})
			data.curPage = ~~data.curPage
			data.eachPage = ~~data.eachPage
			context.commit(GET_EMP_BY_PAGE, data)
		}
	}
}