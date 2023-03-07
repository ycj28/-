<template>
   <div class="login">
      <el-card class="box-card">
         <div slot="header" class="clearfix">
            <span>养老线上平台</span>
         </div>
         <el-form label-width="80px" :model="form" ref="form" :rules="rules">
            <el-form-item label="用户名" prop="username">
               <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
               <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
               <el-input type="nickname" v-model="form.nickname"></el-input>
            </el-form-item>
            <el-button type="primary" @click="register('form')">注册</el-button>
            <el-button type="primary" @click="login()">登录</el-button>
         </el-form>
      </el-card>

   </div>
</template>

<script>
import { nameRule, pwdRule, nickRule } from '../utils/vaildate.js'
import { register } from '../api/api.js'
export default {
   data () {
      return {
         form: {
            username: "",
            password: "",
            nickname: ""
         },
         rules: {
            username: [{ validator: nameRule, trigger: 'blur' }],
            password: [{ validator: pwdRule, trigger: 'blur' }],
            nickname: [{ validator: nickRule, trigger: 'blur' }]
         }
      }
   },
   methods: {
      register (form) {
         this.$refs[form].validate((valid) => {
            if (valid) {
               console.log(this.form)
               register(this.form).then(res => {
                  if (res.data.status === 200) {
                     this.$message({ message: res.data.message, type: 'success' })
                     this.$router.push('/login')
                  }
               })
            } else {
               console.error(this.form)
            }
         })
      },
      login () {
         this.$router.replace('/login')
      }
   }
}
</script>

<style lang="scss">
.login {
   width: 100%;
   height: 100%;
   position: absolute;
   background: #409EFF;

   .box-card {
      width: 450px;
      margin: 200px auto;

      .el-card__header {
         font-size: 34px;
      }

      .el-button {
         width: 40%;
         float: left;
         display: inline;
         margin: 20px 20px;
      }
   }
}
</style>