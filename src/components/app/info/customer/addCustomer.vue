<template>
	<el-form :rules="rules" ref="form" style="width: 400px" :model="form" label-width="100px">
	  <el-form-item label="客户名称" prop="name">
	    <el-input v-model="form.name"></el-input>
	  </el-form-item>
	 	<el-form-item label="资金账户号" prop="capital_account">
	    <el-input v-model="form.capital_account"></el-input>
	  </el-form-item>
	  <el-form-item label="手机号码" prop="phone">
	    <el-input v-model.number="form.phone"></el-input>
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
	    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
    	<el-button @click="resetForm()">重置</el-button>
	  </el-form-item>
  </el-form>
</template>

<script>
import {ASYNC_INSERT_CUSTOMER} from "./customerStore.js"
import {mapState, mapActions, mapMutations } from "vuex"
export default {
	data() {
			return {
				form: {
					name: "",
					capital_account: "",
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
          	{ required: true, message: '请输入手机号码'},
          ]
        }
			}
		},
		methods: {
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						if (this.flag != 0) {
							return this.$message.error('请勿重复提交!!');
						}
						this.flag = 1
						const data = await this[ASYNC_INSERT_CUSTOMER](this.form)
						if (data._id) {
							this.$message('客户创建成功!');
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
	    ...mapActions("customer", [ASYNC_INSERT_CUSTOMER]),
		}
}
</script>
<style></style>