<template>
   <div class="header">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
         <el-tab-pane label="个人中心" name="first">
            <Space></Space>
         </el-tab-pane>
         <el-tab-pane label="修改密码" name="second">
            <Password></Password>
         </el-tab-pane>
         <el-tab-pane label="个人收藏" name="third">
            <Collect></Collect>
         </el-tab-pane>
      </el-tabs>
   </div>
</template>
<script>
import Space from "../personal/Space.vue"
import Password from "../personal/Password.vue"
import Collect from "../personal/Collect.vue"
export default {
   components: {
      Space,
      Password,
      Collect
   },
   data () {
      return {
         activeName: 'first',
         menus: [],
      };
   },
   created () {
      this.menus = [...this.$router.options.routes]
   },
   methods: {
      handleClick (tab, event) {
         console.log(tab, event);
      }
   }
};
</script>
<style lang="scss" scoped>
.header {
   width: 50%;
   margin: auto;
}
</style>