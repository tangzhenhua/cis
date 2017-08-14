<template>
	<el-form :rules="rules" ref="form" style="width: 500px" :model="form" label-width="100px">
		<el-form-item label=" ">
    	<el-button type="danger" @click="del()">删除用户</el-button> 删除操作将无法还原数据,请谨慎操作!
	  </el-form-item>
	  <el-form-item label="客户名称" prop="name">
	    <el-input v-model="form.name"></el-input>
	  </el-form-item>
	 	<el-form-item label="资金账户号" prop="capital_account">
	    <el-input v-model="form.capital_account"></el-input>
	  </el-form-item>
	  <el-form-item label="手机号码" prop="phone">
	    <el-input v-model="form.phone"></el-input>
	  </el-form-item>
	  <el-form-item label="客户类型">
	    <el-select v-model="form.status" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		  </el-select>
	  </el-form-item>

	  <el-form-item label=" ">
	    <el-button type="primary" @click="submitForm('form')">保存</el-button>
    	<el-button @click="resetForm()">重置</el-button>
	  </el-form-item>
  </el-form>
</template>

<script>
import {ASYNC_INSERT_CUSTOMER, ASYNC_DELETE_CURTOMER, ASYNC_GET_CUSTROMER_BY_ID, ASYNC_UPDATE_CUSTOMER} from "./customerStore.js"
import {mapState, mapActions, mapMutations } from "vuex"
import router from "../../../../router/index.js"
export default {
	data() {
			return {
				form: {
					name: "zhangsan",
					capital_account: "001",
					phone: "",
					status: "0"
				},
				options: [{
					value: '0',
					label: '普通客户'
				}, {
					value: '1',
					label: '重点客户'
				}],
				flag: 0,
				rules: {
          name: [
            { required: true, message: '请输入客户名称', trigger: 'blur' },
          ], 
          capital_account: [
            { required: true, message: '请输入资金账号', trigger: 'blur' },
          ],
          phone: [
           	{ required: true, message: '请输入手机号码', trigger: 'blur' },
          ]
        }
			}
		},
		async mounted() {
			this[ASYNC_GET_CUSTROMER_BY_ID](this.$route.params.customerId)
			.then((data) => {
				this.form = data
			})
		},
		methods: {
			async del() {
				const data = await this[ASYNC_DELETE_CURTOMER](this.form._id)
				if(data.ok == "1") {
					this.$message({
						message: "删除成功!",
						duration: 1500
					});
					setTimeout(() => {
						router.push(`/info/customerList`)
					}, 1500)
				}
			},
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						if (this.flag != 0) {
							return this.$message.error('请勿重复提交!!');
						}
						this.flag = 1
						console.log(this.form)
						const data = await this[ASYNC_UPDATE_CUSTOMER](this.form)
						if (data.ok == 1) {
							this.$message('更新成功!');
							setTimeout(() => {
								router.push(`/info/customerList`)
							}, 3000)
						} else {
							this.$message.error('更新失败!');
						}
					} else {
						return false;
					}
				});
			},
			resetForm() {
				Object.assign(this.form, {
					name: "",
					capital_account: "",
					phone: ""
				})
				this.flag = 0
			},
	    ...mapActions("customer", [ASYNC_DELETE_CURTOMER, ASYNC_INSERT_CUSTOMER, ASYNC_GET_CUSTROMER_BY_ID, ASYNC_UPDATE_CUSTOMER]),
		}
}
</script>
<style></style>