<template>
   <div class="index">
      <el-form :model="form" label-width="80px" ref="form">
         <el-form-item label="用户名" prop="nickname">
            <el-input v-model="form.nickname" :readonly="read"></el-input>
         </el-form-item>
         <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" :readonly="read"></el-input>
         </el-form-item>
         <el-form-item label="注册时间" prop="creatTime">
            <el-input v-model="form.createDate" :readonly="read"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" :readonly="read"></el-input>
         </el-form-item>
         <el-form-item label="手机号码" prop="mobilePhoneNumber">
            <el-input v-model="form.mobilePhoneNumber" :readonly="read"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="modify()" v-show="read">修改信息</el-button>
            <el-button type="primary" @click="confirm(form)" v-show="!read">确定修改</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>

import { personal, changePersonal } from '../../api/api.js'
export default {

   data () {
      return {
         form: {
            nickname: '',
            account: '',
            creatTime: '',
            email: '',
            mobilePhoneNumber: ''
         },
         read: true,
      };
   },
   created () {
      personal().then(res => {
         if (res.data.status === 200) {
            this.form = res.data.data
            console.log(this.form)
            this.read = true
         }
      })
   }
   ,
   methods: {
      modify () {
         this.read = false
      },
      confirm (form) {
         changePersonal(form).then(res => {
            if (res.data.status === 200) {
               this.$alert("修改成功")
               this.read = true
            } else {
               this.$alert("修改失败，请重试")
            }
         })
      }
   }
}
   ;

</script>

<style lang="scss" scoped>
.index {
   width: 80%;
   margin: auto;
   padding-top: 20px;
}
</style>