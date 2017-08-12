<template>
	<div>
		<el-table
	    :data="page.data"
	    stripe
	    style="width: 100%">
	    <el-table-column
	      prop="_id"
	      label="员工编号"
	      width="230">
	    </el-table-column>
	    <el-table-column
	      prop="empName"
	      label="员工姓名"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="job"
	      label="员工岗位">
	    </el-table-column>
	    <el-table-column
	      prop="sal"
	      label="员工薪水">
	    </el-table-column>
	    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
	  </el-table>
	   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.count">
    </el-pagination>
	</div>
</template>

<script>

import {mapState, mapActions} from "vuex"
import {ASYNC_GET_EMP_BY_PAGE} from  "./empStore.js"
export default {
	name: "Emp",
	created() {
		this[ASYNC_GET_EMP_BY_PAGE]()
	},
	computed: {
		...mapState("emp", ["page"])
	},
	methods: {
		...mapActions("emp", [ASYNC_GET_EMP_BY_PAGE]),
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this[ASYNC_GET_EMP_BY_PAGE]({
				curPage: this.page.curPage,
				eachPage: val
			})
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this[ASYNC_GET_EMP_BY_PAGE]({
				curPage: val,
				eachPage:  this.page.eachPage
			})
		}
	},
}
</script>

<style>
	
</style>