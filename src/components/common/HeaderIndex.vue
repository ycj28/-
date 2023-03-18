<template>
   <div class="header">
      <el-header>
         <div class="title">PZ线上养老平台</div>
         <el-menu router :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#2578b5" text-color="#fff" active-text-color="#ffd04b">
            <template v-for="(item) in menus">
               <template v-for="(child, index) in item.children">
                  <el-menu-item :index="child.path" :key="index" v-if="child.show">
                     <span>{{ child.name }}</span>
                  </el-menu-item>
               </template>
            </template>
            <el-submenu index="5">
               <template slot="title"><span>你好，<el-link type="primary">{{ name
               }}</el-link> !</span></template>
               <el-menu-item @click="loginout()">注 销</el-menu-item>
               <el-menu-item @click="personal()">个人中心</el-menu-item>
            </el-submenu>
         </el-menu>

      </el-header>
   </div>
</template>
<script>
import { getToken, removeToken } from '../../utils/setTokens.js'
export default {
   data () {
      return {
         menus: [],
         name: '',
         activeIndex: '1',
         activeIndex2: '1'
      }
   },
   created () {
      this.name = getToken('nickname')
      this.menus = [...this.$router.options.routes]
   },
   methods: {
      handleSelect (key, keyPath) {
         console.log(key, keyPath);
      },
      loginout () {
         removeToken('username')
         this.service.get('/logout')
            .then((res) => {
               if (res.data.status === 200) {
                  this.$message({ message: res.data.message, type: 'success' })
                  this.$router.push('/login')
               }
            })
      },
      personal () {
         this.$router.replace('/personal')
      }
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