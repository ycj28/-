<template>
   <div>
      <template :data="tableData">
         <el-card class="box-card">
            <el-row :gutter="20">
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">80岁以上人数：{{ tableData.elder80 }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">60-79岁人数：{{ tableData.elder60to79 }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">60岁以下人数：{{ tableData.elder60 }}</div>
                  </div>
               </el-col>
            </el-row>
            <el-row :gutter="20">
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">北区宿舍人数：{{ tableData.beiqu }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">南区宿舍人数：{{ tableData.nanqu }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">红蓝公寓人数：{{ tableData.gongyu }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">中区宿舍人数：{{ tableData.zhongqu }}</div>
                  </div>
               </el-col>
            </el-row>
            <el-row :gutter="20">
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">护理等级1人数：{{ tableData.level1 }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">护理等级2人数：{{ tableData.level2 }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">护理等级3人数：{{ tableData.level3 }}</div>
                  </div>
               </el-col>
               <el-col :span="6">
                  <div class="grid-content bg-purple">
                     <div class="tag">护理等级4人数：{{ tableData.level4 }}</div>
                  </div>
               </el-col>
            </el-row>
         </el-card>
      </template>


   </div>
</template>
<script>
import { getInformation } from '../../api/api.js'
export default {
   data () {
      return {
         tableData: []
      }
   },
   created () {
      getInformation(this, this.url).then(res => {
         if (res.data.status === 200) {
            this.tableData = res.data.data
            console.log(this.tableData);
         }
      })
   }
}
</script>
<style>
.grid-content {
   margin-bottom: 30px;
}

.grid-content:hover {
   box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.15);
   border-radius: 10px;
}

.tag {
   width: 300px;
   height: 100px;
   border: 1px solid #409EFF;
   border-radius: 10px;
   background-color: rgba(64, 158, 255, 0.9);
   margin: auto;
   color: aliceblue;
   font-family: 'Courier New', Courier, monospace;
   font-size: 20px;
   font-weight: bold;
   line-height: 100px;

}
</style>
