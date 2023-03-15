<template>
   <div class="articleModeration">
      <el-table :data="tableData" border style="width: 100%;">
         <el-table-column prop="title" label="标题" align="center">
         </el-table-column>
         <el-table-column prop="summary" label="简介" align="center">
         </el-table-column>
         <el-table-column prop="source" label="文章来源" align="center">
         </el-table-column>
         <el-table-column prop="author" label="文章作者" align="center">
         </el-table-column>
         <el-table-column label="文章内容" align="center">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-success" @click="pass(scope.row)">通过</el-button>
               <el-button type="danger" size="mini" icon="el-icon-error" @click="del(scope.row)">不通过</el-button>
            </template>
         </el-table-column>
      </el-table>
      <Page :total="total" :url="url"></Page>


      <el-dialog :title="查看文章内容" :visible.sync="dialogFormVisible" width="500px">
         <el-card class="box-card" ref="form">
            {{ this.content }}
         </el-card>
         <div slot="footer" class="dialog-footer">
            <el-button @click="closeInfo('form')">取 消</el-button>
            <el-button type="primary" @click="sure('form')">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>
 
<script>
import { delData, getData } from "../../utils/table.js"
import Page from '../common/Pageing.vue'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         dialogFormVisible: false,
         total: 0,//
         url: 'articles',
         form: {
            content: ""
         },
      }
   },
   created () {
      getData(this, this.url)
   },
   methods: {
      find () {
         this.getData(this.formInline)
      },
      reset () {
         this.formInline = {}
         this.getData(this.formInline)
      },
      // pass (row) {
      //    logicDel(this, 'carousel', row.id, getData)
      // },
      del (row) {
         console.log(row)
         delData(this, 'elder', row.id, getData)
      },
      handleClick (row) {
         getData(this, '/getContent', row.id)
         this.dialogFormVisible = true
      },
      closeInfo (form) {
         this.dialogFormVisible = false
         this.$refs[form].resetFields()
      }
   }
}
</script>

<style lang="scss" scop>
.articleModeration {

   .demo-form-inline,
   .el-form-item {
      margin-right: 20px;
      text-align: left;
   }

   .el-pagination {
      margin-top: 20px;
   }


   .text {
      font-size: 14px;
   }

   .item {
      padding: 18px 0;
   }

   .box-card {
      width: 480px;
   }
}
</style>