<template>
   <div class="index">
      <HeaderIndex />
      <el-container class="content">
         <el-main>
            <div class="cont">
               <router-view></router-view>
            </div>
         </el-main>
         <el-footer>
            <Footer />
         </el-footer>
      </el-container>
   </div>
</template>

<script>
import HeaderIndex from "./common/HeaderIndex.vue"
import Footer from "./common/Footer.vue"
export default {
   components: {
      HeaderIndex,
      Footer,
   },
   data () {
      return {

      }
   }
}
</script>

<style lang="scss">
.index {
   width: 100%;
   height: 100%;

   .content {
      position: absolute;
      width: 100%;
      top: 60px;
      bottom: 0;

      .cont {
         margin: 20px 0;
      }
   }
}
</style>