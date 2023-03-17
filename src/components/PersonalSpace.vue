<template>
   <div class="index">
      <HeaderPersonal />
      <!-- <el-container class="content">

      </el-container> -->
   </div>
</template>

<script>
import HeaderPersonal from "./common/HeaderPersonal.vue"

export default {
   components: {
      HeaderPersonal,
   },
   data () {
      return {

      }
   }
}
</script>

<style lang="scss" scoped>
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