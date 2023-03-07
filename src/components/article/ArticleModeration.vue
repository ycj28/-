<template>
   <div class="articleModeration">
      <el-table :data="compData" border style="width: 100%;">
         <el-table-column prop="title" label="标题" align="center">
         </el-table-column>
         <el-table-column prop="summary" label="简介" align="center">
         </el-table-column>
         <el-table-column prop="view_counts" label="浏览数量" align="center">
         </el-table-column>
         <el-table-column prop="like_num" label="点赞数量" align="center">
         </el-table-column>
         <el-table-column prop="collection_num" label="收藏数量" align="center">
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
      <el-pagination background @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 50]"
         @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
         layout="total,sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>


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
import { delData, getData, logicDel } from "../../utils/table.js"
export default {
   data () {
      return {
         tableData: [],
         dialogFormVisible: false,
         currentPage: 1,// 当前页数是1
         pageSize: 10, // 每页显示条数
         total: 0,//
         form: {
            content: ""
         },
      }
   },
   created () {
      getData(this, '/elder')
   },
   computed: {
      compData () {
         return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
   },
   methods: {
      find () {
         console.log(this.formInline)
         this.getData(this.formInline)
      },
      reset () {
         this.formInline = {}
         this.getData(this.formInline)
      },
      pass (row) {
         logicDel(this, 'carousel', row.id, getData)
      },
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
      },
      handleSizeChange (val) {
         this.pageSize = val
         this.currentPage = 1
         console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
         this.currentPage = val
         console.log(`当前页: ${val}`);
      },
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