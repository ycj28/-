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
            <template slot-scope="scope">
               <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
         </el-table-column>
         <el-table-column prop="createdTime" label="入库时间" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-success" @click="pass(scope.row)">通过</el-button>
               <el-button type="danger" size="mini" icon="el-icon-error" @click="unpass(scope.row)">不通过</el-button>
            </template>
         </el-table-column>
      </el-table>
      <Page :total="total" :url="url"></Page>

      <el-dialog title="查看文章内容" :visible.sync="dialogFormVisible" width="800px">
         <el-card class="box-card">
            <div class="a_body">
               {{ content }}
            </div>
         </el-card>
         <div slot="footer" class="dialog-footer">
            <el-button @click="closeInfo()">关 闭</el-button>
         </div>
      </el-dialog>

   </div>
</template>
 
<script>
import { delData, getData, getContent } from "../../utils/table.js"
import Page from '../common/Pageing.vue'
import { passArticle, unpassArticle } from '../../api/api.js'
export default {
   components: {
      Page
   },
   data () {
      return {
         tableData: [],
         dialogFormVisible: false,
         total: 0,//
         url: 'articlesSpider',
         content: ""
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
      pass (row) {
         passArticle(row.id).then(res => {
            if (res.data.status === 200) {
               this.$message({ message: "审核成功", type: 'success' })
               getData(this, this.url)
            }
         })
      },
      unpass (row) {
         unpassArticle(row.id).then(res => {
            if (res.data.status === 200) {
               this.$message({ message: "审核成功", type: 'success' })
               getData(this, this.url)
            }
         })
      },
      del (row) {
         console.log(row)
         delData(this, 'elder', row.id, getData)
      },
      handleClick (row) {
         getContent(this, this.url + '/getContent', row.id)
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
      width: 750px;

      .a_body {
         font-size: 18px;
         line-height: normal;
      }
   }
}
</style>