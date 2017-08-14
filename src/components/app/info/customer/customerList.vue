<template>
  <div>
    <el-form :model="form" :inline="true" >
      <el-form-item label="客户姓名">
        <el-input v-model="form.name" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="queryHandleClick('name')" type="primary" icon="search">搜索</el-button>
      </el-form-item>
      <el-form-item label="资金账号">
        <el-input v-model="form.capital_account" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryHandleClick('capital_account')" size="small" type="primary" icon="search">搜索</el-button>
      </el-form-item>
      <br>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryHandleClick('phone')" size="small" type="primary" icon="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryHandleClick('all')" size="small" type="primary" icon="search">所有</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryHandleClick('status', '1')" size="small" type="primary" icon="search">重点客户</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryHandleClick('status', '0')" size="small" type="primary" icon="search">普通客户</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="page.data"
      border
      @cell-dblclick="updateCustomerStatus"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="客户姓名"
        >
      </el-table-column>
      <el-table-column
        prop="capital_account"
        label="资金账户号"
       >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        >
        <template scope="scope">
          <el-button 
          @click.native.prevent="getCallRecordsByCustomerId(scope.$index, page.data)"
          size="small">查看联系记录</el-button>
          <el-button size="small">呼出</el-button>
          <el-button @click.native.prevent="updateCustomerHandleClick(scope.$index, page.data)" size="small">更新</el-button>
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
import {
  ASYNC_GET_CUSTROMER_BY_PAGE,
  SET_SHOW_TYPE,
  DESTORYED,
  ASYNC_GET_CUSTROMER_BY_STATUS,
  SET_STATUS,
  ASYNC_UPDATE_CUSTOMER_STATUS
} from "./customerStore.js"
import {mapState, mapActions, mapMutations } from "vuex"
import router from "../../../../router/index.js"
export default {
	methods: {
    tableRowClassName(row, index) {
      if (row.status === "1") {
        return 'info-row';
      } else if (row.status === "0") {
        return 'positive-row';
      }
      return '';
    },
    updateCustomerStatus(row) {
      this[ASYNC_UPDATE_CUSTOMER_STATUS](row._id)
    },
    updateCustomerHandleClick(index, data) {
      router.push(`/info/updateCustomer/${data[index]._id}`)
    },
		getCallRecordsByCustomerId(index, rows) {
      router.push(`/info/callRecordsList/${rows[index]._id}`)
		},
    ...mapActions("customer", [ASYNC_GET_CUSTROMER_BY_PAGE, ASYNC_GET_CUSTROMER_BY_STATUS, ASYNC_UPDATE_CUSTOMER_STATUS]),
    ...mapMutations("customer", [SET_SHOW_TYPE, SET_STATUS, DESTORYED]),
    handleSizeChange(val) {
      const obj = {
        curPage: this.page.curPage,
        eachPage: val
      }
      if(this.showType !== "all") {
        obj[this.showType] = this.form[this.showType]
      }
      this[ASYNC_GET_CUSTROMER_BY_PAGE](obj)
    },
    handleCurrentChange(val) {
      const obj = {
        curPage: val,
        eachPage:  this.page.eachPage
      }
      if (this.showType !== "all") {
        obj[this.showType] = this.form[this.showType]
      }
      this[ASYNC_GET_CUSTROMER_BY_PAGE](obj)
    },
    queryHandleClick(key, status) {
      for (let attr in this.form) {
        if (key !== attr) {
          this.form[attr] = ""
        }
      }
      const obj = {
        curPage: 1,
        eachPage: 10
      }
      if(key === "status") {
        obj[key] = status
        this[SET_STATUS](status)
      } else {
        obj[key] = this.form[key]
      }
      this[SET_SHOW_TYPE](key)
      this[ASYNC_GET_CUSTROMER_BY_PAGE](obj)
    }
	},
	mounted() {
		this[ASYNC_GET_CUSTROMER_BY_PAGE]({
      curPage: this.page.curPage,
      eachPage: this.page.eachPage
    })
	},
  destroyed() {
    this[DESTORYED]()
  },
	computed: {
		...mapState("customer", ["page", "showType", "form", "status"])
	}
}
</script>
<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>