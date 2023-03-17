<template>
   <div class="index">
      <el-form :rules="rules" :model="form" label-width="80px" ref="form">
         <el-form-item label="原密码" prop="oldPasword">
            <el-input v-model="form.oldPassword" placeholder="请输入原密码"></el-input>
         </el-form-item>
         <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" placeholder="请输入新密码"></el-input>
         </el-form-item>
         <el-form-item label="确认密码" prop="confPassword">
            <el-input v-model="form.confPassword" placeholder="请输入再次输入新密码"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="confirm(form)">确定修改</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
import { pwdRule } from '../../utils/vaildate.js'
import { modifyPwd } from '../../api/api.js'
import { getToken, removeToken } from '../../utils/setTokens.js'
export default {

   data () {
      return {
         form: {
            token: getToken('token'),
            oldPassword: '',
            newPassword: '',
            confPassword: ''
         },
         rules: {
            oldPassword: [{ validator: pwdRule, trigger: 'blur', required: true }],
            newPassword: [{ validator: pwdRule, trigger: 'blur', required: true }],
            confPassword: [{ validator: pwdRule, trigger: 'blur', required: true }],

         },
      };
   }
   ,
   methods: {
      confirm (form) {
         if (form.oldPassword == form.newPassword) {
            this.$message({
               message: '新密码与旧密码相同',
               type: 'warning'
            })
            return
         }
         if (form.newPassword != form.confPassword) {
            this.$message({
               message: '两次输入的新密码不相同',
               type: 'warning'
            });
            return
         }
         modifyPwd(form).then(res => {
            if (res.data.status === 200) {
               removeToken('username')
               this.service.get('/logout')
                  .then((res) => {
                     if (res.data.status === 200) {
                        this.$message({ message: res.data.message, type: 'success' })
                        this.$router.push('/login')
                     }
                  })
            }
         })

      }
   }
}

</script>

<style lang="scss" scoped>
.index {
   width: 80%;
   margin: auto;
   padding-top: 20px;
}
</style>