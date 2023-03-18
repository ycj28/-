<template>
   <div class="header">
      <el-header>
         <div class="title">养老后台管理系统</div>
         <div>
            <span>你好，<el-link type="primary">{{ name }}</el-link> ！</span>
            <el-button type="info" size="mini" @click="loginout()">退出系统</el-button>
         </div>
      </el-header>
   </div>
</template>
<script>
import { getToken, removeToken } from '../../utils/setTokens.js'
export default {
   data () {
      return {
         name: ''
      }
   },
   created () {
      this.name = getToken('nickname')
      console.log(this.name)
   }, methods: {
      loginout () {
         removeToken('username')
         this.service.get('/logout')
            .then((res) => {
               if (res.data.status === 200) {
                  this.$message({ message: res.data.message, type: 'success' })
                  this.$router.push('/admin/login')
               }
            })
      },
   }
}
</script>
<style lang="scss" scoped>
.header {
   .el-header {
      background: #2578b5;
      color: #fff;
      line-height: 60px;
      display: flex;
      justify-content: space-between;

      .title {
         width: 200px;
         font-size: 24px;
      }
   }
}
</style>