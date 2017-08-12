<template>
	<el-row type="flex" class="row-bg">
	  <el-col :span="4">
	  	<el-menu router :default-openeds="openArr" default-active="2" class="el-menu-vertical-demo">
	      <el-submenu index="1">
	        <template slot="title"><i class="el-icon-message"></i>客户管理</template>
          <el-menu-item index="/info/addCustomer">新增客户</el-menu-item>
          <el-menu-item index="/info/customerList">客户列表</el-menu-item>
	      </el-submenu>
	      <el-submenu index="2">
	        <template slot="title"><i class="el-icon-message"></i>沟通记录</template>
          <el-menu-item index="/info/addCustomer">新增记录</el-menu-item>
          <el-menu-item index="/info/callRecordsListAll">记录列表</el-menu-item>
	      </el-submenu>
	    </el-menu>
	  </el-col>
	  <el-col :span="20">
	  	<router-view></router-view>
	  </el-col>
	</el-row>
</template>

<script>
export default {
	name: "info",
	data() {
		return {
			openArr: ["1"]
		}
	},
	 methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
.info-content {
	display: flex;
}

.info-content > * {
	margin-right: 20px;
}

</style>