<template>
	<el-form :rules="rules" ref="form" style="width: 600px" :model="form" label-width="100px">
		<el-form-item label="沟通日期">
	   	<el-date-picker
	      v-model="form.relationTime"
	      type="date"
	      @change="relationTime"
	      placeholder="选择日期">
	    </el-date-picker>
	  </el-form-item>
	  <el-form-item label="客户情况" prop="customerSituation">
	    <el-input
			  type="textarea"
			  :rows="4"
			  placeholder="请输入内容"
			  v-model="form.customerSituation">
			</el-input>
	  </el-form-item>
	 	<el-form-item label="沟通情况" prop="communicationSituation">
	    <el-input
			  type="textarea"
			  :rows="4"
			  placeholder="请输入内容"
			  v-model="form.communicationSituation">
			</el-input>
	  </el-form-item>
	  <el-form-item label=" ">
	    <el-button type="primary" @click="submitForm('form')">保存</el-button>
    	<el-button @click="resetForm()">重置</el-button>
	  </el-form-item>
  </el-form>
</template>

<script>
import {ASYNC_ADD_CALL_RECORDS} from "./callRecordStore.js"
import {mapState, mapActions, mapMutations } from "vuex"
export default {
	data() {
		return {
			form: {
				customerId: '0',
				relationTime: "",
				customerSituation: "",
				communicationSituation: ""
			},
			rules: {
        customerSituation: [
          { required: true, message: '请输入客户情况', trigger: 'blur' },
        ], 
        communicationSituation: [
          { required: true, message: '请输入沟通情况', trigger: 'blur' },
        ]
      },
      flag: 0
		}
	},
	mounted() {
		this.form.relationTime = new Date()
	},
	created() {
		this.form.customerId = this.$route.params.customerId
	},
	methods: {
		resetForm() {
			Object.assign(this.form, {
				relationTime: new Date(),
				customerSituation: "",
				communicationSituation: ""
			})
			this.flag = 0
		},
		relationTime(e) {
			this.form.relationTime = e
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					if (this.flag != 0) {
						return this.$message.error('请勿重复提交!!');
					}
					this.flag = 1
					const data = await this[ASYNC_ADD_CALL_RECORDS](this.form)
					if (data._id) {
						this.$message('新增联系成功!');
					}
				} else {
					return false;
				}
			});
		},
		...mapActions("callRecord", [ASYNC_ADD_CALL_RECORDS])
	}
}
</script>
<style></style>