<template>
   <div class="index">
      <el-card class="box-card">
         <div slot="header" class="clearfix">
            <span>提出建议</span>
            <el-button style="float: right;" type="primary" @click="submit()">提交</el-button>
         </div>
         <el-input type="textarea" :rows="10" placeholder="请提出您的宝贵建议" v-model="textarea" clearable maxlength="250"
            show-word-limit>
         </el-input>
      </el-card>
   </div>
</template>
<script>
export default {
   data () {
      return {
         textarea: ''
      }
   },
   methods: {
      submit () {
         this.$message({ message: "提交建议成功", type: 'success' })
         this.textarea = ''
      }
   }
}
</script>
<style lang="scss" scoped>
.index {
   width: 60%;
   margin: auto;

   span {
      font-size: 28px;
   }

   .text {
      font-size: 14px;
   }

   .item {
      margin-bottom: 18px;
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
      height: 400px;
   }

}
</style>