<template>
   <div class="header">
      <el-header>
         <div class="title">养老后台管理系统</div>
         <span>你好，<el-link type="primary">{{ name }}</el-link> ！</span>
      </el-header>
   </div>
</template>
<script>
import { getToken } from '../../utils/setTokens.js'
export default {
   data () {
      return {
         name: ''
      }
   },
   created () {
      this.name = getToken('username')
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