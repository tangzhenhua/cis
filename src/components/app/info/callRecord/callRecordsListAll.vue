<template>
	<div>
		<el-form :model="form" :inline="true" >
      <el-form-item label="联系时间">
        <el-date-picker
		      v-model="form.relationTime"
		      type="date"
		      size="small"
		      placeholder="选择日期"
		      @change="relationTime"
		      >
		    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryHandleClick()" size="small" type="primary" icon="search">搜索</el-button>
      </el-form-item>
    </el-form>
		<el-table
		height="550"
	  :data="page.data"
	  style="width: 100%">
		  <el-table-column type="expand">
		    <template scope="props">
		      <el-form label-position="left" inline class="demo-table-expand">
		        <el-form-item label="客户名称">
		          <span>{{ props.row.customerId.name }}</span>
		        </el-form-item>
		     		<el-form-item label="资金账户号">
		          <span>{{ props.row.customerId.capital_account }}</span>
		        </el-form-item>
		        <el-form-item label="手机号">
		          <span>{{ props.row.customerId.phone }}</span>
		        </el-form-item>
		      </el-form>
		    </template>
		  </el-table-column>
		  <el-table-column
		    label="客户姓名"
		    prop="customerId.name">
		  </el-table-column>
		  <el-table-column
		    label="沟通情况"
		    prop="communicationSituation">
		  </el-table-column>
		  <el-table-column
		    label="客户情况"
		    prop="customerSituation">
		  </el-table-column>
		  <el-table-column
		    label="联系时间"
		    prop="relation_time">
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
import {mapState, mapActions, mapMutations} from "vuex"
import {ASYNC_GET_CALL_RECORDS_BY_PAGE, INIT} from "./callRecordStore.js"
export default {
	computed: {
		...mapState("callRecord", ["page", "form"])
	},
	mounted() {
		this[ASYNC_GET_CALL_RECORDS_BY_PAGE]()
	},
	destroyed() {
		this[INIT]()
	},
	methods: {
		relationTime(e) {
			this.form.relationTime = e
		},
		...mapMutations("callRecord", [INIT]),
		...mapActions("callRecord", [ASYNC_GET_CALL_RECORDS_BY_PAGE]),		
		handleSizeChange(val) {
      this[ASYNC_GET_CALL_RECORDS_BY_PAGE]({
        curPage: this.page.curPage,
        eachPage: val
      })
    },
    handleCurrentChange(val) {
      this[ASYNC_GET_CALL_RECORDS_BY_PAGE]({
        curPage: val,
        eachPage:  this.page.eachPage
      })
    },
    queryHandleClick() {
			this[ASYNC_GET_CALL_RECORDS_BY_PAGE]({
				curPage: 1,
				eachPage: 10
			})
    }
	}
}
</script>
<style>
	.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>