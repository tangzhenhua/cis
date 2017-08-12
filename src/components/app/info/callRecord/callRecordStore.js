export const GET_CALL_RECORDS_BY_PAGE = "GET_CALL_RECORDS_BY_PAGE"
export const ASYNC_GET_CALL_RECORDS_BY_PAGE = "ASYNC_GET_CALL_RECORDS_BY_PAGE"

import axios from "axios"

export default {
	namespaced: true,
	state: {
		page: {
			curPage: 1,
			eachPage: 10,
			maxPage: 0,
			data: []
		},
		isLoaing: true
	},
	mutations: {
		[GET_CALL_RECORDS_BY_PAGE](state, page) {
			state.page = page
		},
	},
	actions: {
		async [ASYNC_GET_CALL_RECORDS_BY_PAGE](context, {curPage = 1, eachPage = 10, customerId} = {}) {
			if(!customerId) {
				return 
			}
			const {
				data
			} = await axios.get("http://localhost:3001/callRecord/getCallRecordByPage", {
				params: {
					curPage,
					eachPage,
					customerId
				}
			})
			data.curPage = ~~data.curPage
			data.eachPage = ~~data.eachPage
			context.commit(GET_CALL_RECORDS_BY_PAGE, data)
		}
	}
}