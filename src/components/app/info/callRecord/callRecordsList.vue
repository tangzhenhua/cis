<template>
	<div>
		<el-table
	  :data="page.data"
	  height="550"
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
		   <el-table-column
        fixed="right"
        label="操作"
        >
        <template scope="scope">
          <el-button type="warning" @click.native.prevent="update(scope.$index, page.data)" size="small">更新</el-button>
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
import {mapState, mapActions, mapMutations} from "vuex"
import {ASYNC_GET_CALL_RECORDS_BY_PAGE, SET_CUSTOMER_ID, INIT, ASYNC_REMOVE_CALL_RECORD} from "./callRecordStore.js"
import router from "../../../../router/index.js"
export default {
	created() {
		this[SET_CUSTOMER_ID](this.$route.params.customerId)
		this[ASYNC_GET_CALL_RECORDS_BY_PAGE]()
	},
	destroyed() {
		this[INIT]()
	},
	computed: {
		...mapState("callRecord", ["page", "customerId"]),
	},
	methods: {
		update(index, data) {
			router.push(`/info/updateCallRecord/${data[index]._id}`)
		},
		...mapMutations("callRecord", [SET_CUSTOMER_ID, INIT]),
		...mapActions("callRecord", [ASYNC_GET_CALL_RECORDS_BY_PAGE, ASYNC_REMOVE_CALL_RECORD]),		
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