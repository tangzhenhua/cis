<template>
	<el-form :rules="rules" ref="form" style="width: 600px" :model="form" label-width="100px">
		<el-form-item label="客户姓名">
	   	{{form.name}}
	  </el-form-item>
		<el-form-item label="沟通日期">
	   	<el-date-picker
	      v-model="form.relationTime"
	      type="date"
	      @change="relationTime"
	      :default-value="form.relationTime"
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
import {ASYNC_ADD_CALL_RECORDS, ASYNC_GET_CALL_RECORD_BY_ID, ASYNC_UPDATE_CALL_RECORD_BY_ID} from "./callRecordStore.js"
import {mapState, mapActions, mapMutations } from "vuex"
export default {
	data() {
		return {
			form: {
				_id: "",
				name: "",
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
		this.init()
	},

	methods: {
		async init() {
			const data = await this[ASYNC_GET_CALL_RECORD_BY_ID](this.$route.params._id)
			const relationTime = data.relation_time.split("-");
			this.form.name = data.customerId.name
			this.form.relationTime = new Date(relationTime[0], (~~relationTime[1]) - 1, relationTime[2])
			this.form.customerSituation = data.customerSituation
			this.form.communicationSituation = data.communicationSituation
			this.form._id = data._id
		},
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
					const data = await this[ASYNC_UPDATE_CALL_RECORD_BY_ID](this.form)
					if (data.nModified == "1") {
						this.$message('更新成功!');
				  }
				} else {
					return false;
				}
			});
		},
		...mapActions("callRecord", [ASYNC_UPDATE_CALL_RECORD_BY_ID, ASYNC_ADD_CALL_RECORDS, ASYNC_GET_CALL_RECORD_BY_ID])
	}
}
</script>
<style></style>