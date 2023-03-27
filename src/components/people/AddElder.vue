<template>
   <div class="main">
      <el-card class="box-card">
         <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
               <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
               <el-input v-model="form.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
               <el-radio v-model="form.gender" label="男">男</el-radio>
               <el-radio v-model="form.gender" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="是否出院" :label-width="formLabelWidth" prop="picture">
               <el-radio v-model="form.isLeave" label="0">已出院</el-radio>
               <el-radio v-model="form.isLeave" label="1">未出院</el-radio>
            </el-form-item>

            <el-form-item label="护理等级" label-width="formLabelWidth" prop="level">
               <el-select v-model="form.level" placeholder="请选择护理等级">
                  <el-option label="等级一" value="1"></el-option>
                  <el-option label="等级二" value="2"></el-option>
                  <el-option label="等级三" value="3"></el-option>
                  <el-option label="等级四" value="4"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="宿舍区域" :label-width="formLabelWidth" prop="dormitory">
               <!-- <el-input v-model="form.dormitory" autocomplete="off"></el-input> -->
               <el-cascader :options="options" v-model="arr" :props="{ expandTrigger: 'hover' }" @change="handleChange"
                  clearable separator=" "></el-cascader>
            </el-form-item>
            <el-form-item label="房间号" :label-width="formLabelWidth" prop="dormitory">
               <el-input v-model="form.roomNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="入院时间" :label-width="formLabelWidth" prop="time">
               <el-date-picker v-model="form.startTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                  placeholder="选择日期">
               </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
               <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="phone">
               <el-input v-model="form.remark" type="textarea" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSubmit('form')">入住</el-button>
               <el-button @click="clear()">清空</el-button>
            </el-form-item>
         </el-form>
      </el-card>

   </div>
</template>

<script>
import { phone, age, name } from '../../utils/vaildate.js'
import { changeInfo } from "../../utils/table.js"
export default {
   data () {
      return {
         arr: [],
         form: {
            name: '',
            gender: '',
            age: '',
            level: '',
            isLeave: '1',
            dormitory: '',
            address: '',
            time: '',
            phone: '',
         },
         rules: {
            name: [{ validator: name, trigger: 'blur' }],
            gender: [{ required: true }],
            isLeave: [{ required: true }],
            dormitory: [{ required: true, message: '请输入地址' }],
            phone: [{ validator: phone, trigger: 'blur' }],
            age: [{ validator: age, trigger: 'blur' }]
         },
         formLabelWidth: "80px",
         options: [{
            value: '北区',
            label: '北区',
            children: [{
               value: '一栋',
               label: '一栋',
            }, {
               value: '二栋',
               label: '二栋',
            }, {
               value: '三栋',
               label: '三栋',
            }, {
               value: '四栋',
               label: '四栋',
            }, {
               value: '五栋',
               label: '五栋',
            }, {
               value: '六栋',
               label: '六栋',
            }, {
               value: '七栋',
               label: '七栋',
            }]
         }, {
            value: '中区',
            label: '中区',
            children: [{
               value: '一栋',
               label: '一栋',
            }, {
               value: '二栋',
               label: '二栋',
            }, {
               value: '三栋',
               label: '三栋',
            }, {
               value: '四栋',
               label: '四栋',
            }, {
               value: '五栋',
               label: '五栋',
            }]
         }, {
            value: '南区',
            label: '南区',
            children: [{
               value: '一栋',
               label: '一栋',
            }, {
               value: '二栋',
               label: '二栋',
            }, {
               value: '三栋',
               label: '三栋',
            }, {
               value: '四栋',
               label: '四栋',
            }, {
               value: '五栋',
               label: '五栋',
            }]
         }, {
            value: '红蓝',
            label: '红蓝',
            children: [{
               value: 'E栋',
               label: 'E栋',
            }, {
               value: 'F栋',
               label: 'F栋',
            }, {
               value: 'G栋',
               label: 'G栋',
            }, {
               value: 'H栋',
               label: 'H栋',
            }, {
               value: 'I栋',
               label: 'I栋',
            }]
         }]
      };


   },
   methods: {
      onSubmit (form) {
         this.$refs[form].validate(valid => {
            if (valid) {
               changeInfo(this, 'post', '/elder', JSON.stringify(this.form))
               this.$message({ message: "入住成功", type: 'success' })
            }
         })
      },
      clear () {
         this.form = {
            isLeave: '1',
         },
            this.arr = []
      },
      handleChange (value) {
         this.form.dormitory = value[0] + value[1]
      }
   }
}
</script>
<style lang="scss" scoped>
.main {
   width: 50%;
   margin: auto;

   .text {
      font-size: 20px;
      font-weight: bold;
   }

   .item {
      margin-bottom: 10px;


   }

   .clearfix:before,
   .clearfix:after {
      display: table;
      content: "";
   }

   .clearfix:after {
      clear: both
   }

   .box-card {
      width: 100%;
   }
}
</style>
