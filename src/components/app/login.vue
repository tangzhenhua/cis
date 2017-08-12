<template>
	<el-row type="flex" class="row-bg">
	  <el-col :span="6"></el-col>
	  <el-col :span="12">
	  	<el-form label-width="80px">
			  <el-form-item label="用户名">
			    <el-input v-model="username"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input type="password" v-model="password"></el-input>
			  </el-form-item>
			  <el-form-item label=" ">
				  <el-button @click="login" type="primary">登录</el-button>
				  <el-button @click="reg" type="primary">注册</el-button>
			  </el-form-item>
			</el-form>
	  </el-col>
	  <el-col :span="6"></el-col>
	</el-row>
</template>

<script>
import router from "../../router/index.js"
export default {
	name: "login",
	data() {
		console.log(this)
		return {
			username: this.$route.params.username || "zhangsan",
			password: "111111"
		}
	},
	methods: {
		login() {
			router.push(`/info`)
		},
		reg() {
			router.push("/reg")
		}
	}
}
</script>

<style>

</style>